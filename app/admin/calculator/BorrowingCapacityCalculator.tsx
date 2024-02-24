"use client";

import { getAllCohorts, getCohort } from "@/actions/cohorts-actions";
import { getAllRevenueShareDriversByCohortId } from "@/actions/drivers-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CohortResponse,
  RevenueDriverResponse,
  RevenueShareDriverResponse,
} from "@/types/types";
import React, { ChangeEvent, useEffect, useState } from "react";

type RBFSchedule = {
  month: number;
  monthlyRevenue: number;
  growthRate: number;
  revenueHaircut: number;
  revenueShareMonthly: number;
  receiptsRate: number;
  revenueShareCommulative: number;
  returnCapAchieved: number;
};

const BorrowingCapacityCalculator = () => {
  const [cohorts, setCohorts] = useState<CohortResponse[]>([]);
  const [cohort, setCohort] = useState<CohortResponse>();
  const [revenueShareDrivers, setRevenueShareDrivers] = useState<
    RevenueShareDriverResponse[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [fund, setFund] = useState(0);
  const [cohortId, setCohortId] = useState(0);
  const [payoffMonth, setPayoffMonth] = useState(0);
  const [revenueShareType, setRevenueShareType] = useState("");
  const [revenueProjectionType, setRevenueProjectionType] = useState("");
  const [revenueHaircut, setRevenueHaircut] = useState(0);
  const [monthlyRevenueCalculatedArray] = useState<RBFSchedule[]>([]);

  const [term, setTerm] = useState(0);
  const [returnCap, setReturnCap] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [borrowingCapacity, setBorrowingCapacity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllCohorts();
        setCohorts(res);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getCohort(cohortId);
        setCohort(res);
        const res2 = await getAllRevenueShareDriversByCohortId(cohortId);
        setRevenueShareDrivers(res2);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated, cohortId]);

  useEffect(() => {
    const totalHaircut =
      cohort?.risks?.reduce((acc, item) => acc + item.percentage, 0) || 0;
    setRevenueHaircut(Number(totalHaircut));
  }, [cohort]);

  useEffect(() => {
    const calculatedTotalRepayment = term * monthlyPayment || 0;
    const calculatedBorrowingCapacity = totalRepayment / returnCap || 0;

    setTotalRepayment(calculatedTotalRepayment);
    setBorrowingCapacity(calculatedBorrowingCapacity);
  }, [term, monthlyPayment, totalRepayment, returnCap]);

  useEffect(() => {
    console.log("first", monthlyRevenueCalculatedArray);
  }, [monthlyRevenueCalculatedArray]);

  //
  //
  //

  const handleCalculateClick = () => {
    setLoading(true);
    if (cohort) {
      monthlyRevenueCalculatedArray.length = 0;
      const calculatedTerm = payoffMonth;
      setTerm(Number(calculatedTerm));

      const compareEndingMonth = (
        a: RevenueDriverResponse,
        b: RevenueDriverResponse
      ): number => {
        return a.endingMonth - b.endingMonth;
      };

      const comparePhase = (
        a: RevenueShareDriverResponse,
        b: RevenueShareDriverResponse
      ): number => {
        return a.variableTypePhase - b.variableTypePhase;
      };

      // term
      // initialMonthlyRevenue
      // revenueHairCut
      // early payoff month

      const calculatedReturnCap =
        revenueShareType.toLowerCase() === "fixed"
          ? cohort.payoffMonths.find((month) => month.month === payoffMonth)
              ?.fixedRevenueShareRate
          : revenueShareType.toLowerCase() === "variable" &&
            cohort.payoffMonths.find((month) => month.month === payoffMonth)
              ?.variableRevenueShareRate;

      setReturnCap(Number(calculatedReturnCap));

      // return cap
      let monthlyRevenueCurrent = monthlyRevenue;

      let currentSelectedReceiptRate = 0;

      for (let i = 1; i <= payoffMonth; i++) {
        const currentMonth = i;
        const matchingRevenueDriver: RevenueDriverResponse | undefined =
          cohort.revenueDrivers
            .sort(compareEndingMonth)
            .find((item) => item.endingMonth >= currentMonth);

        const revenueShareMonthlyMatching = cohort.revenueShareDrivers.find(
          (item) =>
            item.type.toLocaleLowerCase() === revenueShareType.toLowerCase()
        );

        const revenueShareMonthlyMatchingForVariable =
          cohort.revenueShareDrivers.filter(
            (item) =>
              item.type.toLocaleLowerCase() === revenueShareType.toLowerCase()
          );

        if (revenueShareMonthlyMatching) {
          if (revenueShareMonthlyMatching.type.toLowerCase() === "fixed") {
            // For fixed type, use the fixed receiptsRate
            currentSelectedReceiptRate =
              revenueShareMonthlyMatching.receiptsRate;
          } else if (
            revenueShareMonthlyMatching.type.toLowerCase() === "variable"
          ) {
            revenueShareMonthlyMatchingForVariable.sort(comparePhase);
            let cumulativeSum = 0;

            currentSelectedReceiptRate =
              revenueShareMonthlyMatchingForVariable.find((item) => {
                cumulativeSum += item.months;
                return cumulativeSum >= currentMonth;
              })?.receiptsRate || 0;
          }
        }

        // Now, selectedReceiptRate contains the appropriate value based on the conditions
        console.log("Month", i, ":", currentSelectedReceiptRate);

        if (matchingRevenueDriver) {
          let monthlyRevenueCalculated =
            monthlyRevenueCurrent *
            (1 + (i === 1 ? 1 : matchingRevenueDriver.growthRate) / 100);
          let monthlyRevenueHaircut =
            monthlyRevenueCalculated * (1 - revenueHaircut / 100);
          let revenueShareMonthly =
            monthlyRevenueHaircut * (currentSelectedReceiptRate / 100);
          monthlyRevenueCalculatedArray.push({
            month: i,
            monthlyRevenue: monthlyRevenueCalculated,
            growthRate: i === 1 ? 1 : matchingRevenueDriver.growthRate,
            revenueHaircut: monthlyRevenueHaircut,
            revenueShareMonthly: revenueShareMonthly,
            receiptsRate: currentSelectedReceiptRate,
            revenueShareCommulative: monthlyRevenueCalculatedArray.reduce(
              (acc, item) => acc + item.revenueShareMonthly,
              revenueShareMonthly
            ),
            returnCapAchieved:
              (monthlyRevenueCalculatedArray.reduce(
                (acc, item) => acc + item.revenueShareMonthly,
                revenueShareMonthly
              ) || 0) / fund || 0,
          });
          monthlyRevenueCurrent = monthlyRevenueCalculated;
        } else {
          console.warn(`No revenue driver found for month ${currentMonth}`);
        }
      }

      // const calculatedMonthlyPayment =
      //   revenueShareType.toLowerCase() === "fixed" &&
      //   revenueShareDrivers.find((item) => item.type.toLowerCase() === "fixed")
      //     ?.receiptsRate !== undefined
      //     ? (Number(
      //         revenueShareDrivers.find(
      //           (item) => item.type.toLowerCase() === "fixed"
      //         )?.receiptsRate
      //       ) *
      //         monthlyRevenue) /
      //       100
      //     : 0;

      // setMonthlyPayment(calculatedMonthlyPayment);
    }
    setLoading(false);
  };

  //
  //
  //

  return (
    <div className="grid md:grid-cols-2 gap-16">
      <div className="grid md:grid-cols-2 gap-2">
        <div>
          <select
            id="cohort"
            required
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCohortId(Number(e.target.value))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select Cohort</option>
            {cohorts.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="payoffMonths"
            required
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPayoffMonth(Number(e.target.value))
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Payoff Month</option>
            {cohort?.payoffMonths?.map((item) => (
              <option value={item.month}>{item.month}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="revenueShareType"
            required
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setRevenueShareType(e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Revenue Share Type</option>
            {cohort?.revenueShareTypes?.map((item) => (
              <option value={item.type}>{item.type}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="revenueProjectionType"
            required
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setRevenueProjectionType(e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Revenue Share Type</option>
            {cohort?.revenueProjectionTypes?.map((item) => (
              <option value={item.type}>{item.type}</option>
            ))}
          </select>
        </div>
        <Input
          type="number"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMonthlyRevenue(Number(e.target.value))
          }
          placeholder="Monthly Revenue"
        />
        <Input
          type="number"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFund(Number(e.target.value))
          }
          placeholder="Fund"
        />
        <div></div>
        <Button
          className="bg-cyan-500"
          disabled={
            !payoffMonth ||
            !monthlyRevenue ||
            !revenueShareType ||
            !revenueProjectionType
          }
          onClick={() => handleCalculateClick()}
        >
          {loading ? "Calculating ..." : "Calculate"}
        </Button>
        <div className="col-span-2 border p-2 rounded-xl shadow pt-4">
          <h1 className="border-b pb-2 mb-2 text-cyan-500 text-bold">
            Selected Cohort
          </h1>
          {cohort && (
            <div className="grid w-full">
              <div className="flex items-center justify-between">
                <span>Cohort Name</span>
                <span>{cohort.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Max Facility Term</span>
                <span>{cohort.maxFacilityTerm} Months</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Early Payoff Month</span>
                <span>{payoffMonth} Months</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Revenue Share Type</span>
                <span>{revenueShareType}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Revenue Projection Type</span>
                <span>{revenueProjectionType}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Card>
        <CardHeader className="border-b mb-2 text-xl">
          <CardTitle>Calculated Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full">
            <div className="flex items-center border-b justify-between">
              <span>Monthly Revenue</span>
              <span>{monthlyRevenue.toLocaleString()} ETB</span>
            </div>
            <div className="flex items-center border-b justify-between">
              <span>Term</span>
              <span>{term} Months</span>
            </div>
            <div className="flex items-center border-b justify-between">
              <span>Return Cap</span>
              <span>{returnCap}x of Principal</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span>Total Repayment</span>
              {monthlyRevenueCalculatedArray && (
                <span>
                  {(
                    monthlyRevenueCalculatedArray.reduce(
                      (acc, item) => acc + item.revenueShareMonthly,
                      0
                    ) || 0
                  ).toLocaleString()}{" "}
                  ETB
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xl font-bold text-cyan-500 py-1 border-t">
              <span>Borrowing Capacity</span>
              <span>
                {(
                  (monthlyRevenueCalculatedArray.reduce(
                    (acc, item) => acc + item.revenueShareMonthly,
                    0
                  ) || 0) / returnCap || 0
                ).toLocaleString()}{" "}
                ETB
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-2">
        <h1 className="text-3xl font-bold text-cyan-500 border-b pb-2 mb-5">
          Payment Schedule
        </h1>
        {monthlyRevenueCalculatedArray.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Growth Rate</TableHead>
                <TableHead>MonthlyRevenue</TableHead>
                <TableHead>Revenue Haircut</TableHead>
                <TableHead>Monthly Revenue Haircut</TableHead>
                <TableHead>Receipts Rate</TableHead>
                <TableHead>Monthly Revenue Share</TableHead>
                <TableHead>Revenue Share Commulative</TableHead>
                <TableHead>Return Cap Achieved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyRevenueCalculatedArray.map((invoice) => (
                <TableRow key={invoice.monthlyRevenue}>
                  <TableCell>Month {invoice.month}</TableCell>
                  <TableCell>{invoice.growthRate}%</TableCell>
                  <TableCell>{invoice.monthlyRevenue.toFixed(2)}</TableCell>
                  <TableCell>{revenueHaircut}%</TableCell>
                  <TableCell>{invoice.revenueHaircut.toFixed(2)}</TableCell>
                  <TableCell>{invoice.receiptsRate}%</TableCell>
                  <TableCell>
                    {invoice.revenueShareMonthly.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {invoice.revenueShareCommulative.toFixed(2)}
                  </TableCell>
                  <TableCell>{invoice.returnCapAchieved.toFixed(2)}x</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BorrowingCapacityCalculator;
