"use client";

import { getAllCohorts } from "@/actions/cohorts-actions";
import { getAllRevenueShareDrivers } from "@/actions/drivers-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CohortResponse, RevenueShareDriverResponse } from "@/types/types";
import React, { ChangeEvent, useEffect, useState } from "react";

const BorrowingCapacityCalculator = () => {
  const [cohorts, setCohorts] = useState<CohortResponse[]>([]);
  const [revenueShareDrivers, setRevenueShareDrivers] = useState<
    RevenueShareDriverResponse[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [cohortId, setCohortId] = useState(0);

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
        const res2 = await getAllRevenueShareDrivers();
        setRevenueShareDrivers(res2);
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
    const calculatedTotalRepayment = term * monthlyPayment || 0;
    const calculatedBorrowingCapacity = totalRepayment / returnCap || 0;

    setTotalRepayment(calculatedTotalRepayment);
    setBorrowingCapacity(calculatedBorrowingCapacity);
  }, [term, monthlyPayment, totalRepayment, returnCap]);

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
        <Input
          type="number"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMonthlyRevenue(Number(e.target.value))
          }
          placeholder="Monthly Revenue"
        />
        <div></div>
        <Button
          className="bg-cyan-500"
          onClick={() => {
            console.log(monthlyRevenue, cohortId);
            const selectedCohort = cohorts.find((item) => item.id === cohortId);
            console.log(selectedCohort);

            // Check if selectedCohort is not null before proceeding
            if (selectedCohort) {
              const calculatedTerm = selectedCohort?.payoffMonth.month || 0;
              setTerm(Number(calculatedTerm));

              const calculatedReturnCap =
                selectedCohort.revenueShareType.type.toLowerCase() === "fixed"
                  ? selectedCohort.payoffMonth.fixedRevenueShareRate
                  : selectedCohort.revenueShareType.type.toLowerCase() ===
                      "variable" &&
                    selectedCohort.payoffMonth.variableRevenueShareRate;

              setReturnCap(Number(calculatedReturnCap));

              const calculatedMonthlyPayment =
                selectedCohort.revenueShareType.type.toLowerCase() ===
                  "fixed" &&
                revenueShareDrivers.find(
                  (item) => item.type.toLowerCase() === "fixed"
                )?.receiptsRate !== undefined
                  ? (Number(
                      revenueShareDrivers.find(
                        (item) => item.type.toLowerCase() === "fixed"
                      )?.receiptsRate
                    ) *
                      monthlyRevenue) /
                    100
                  : 0;

              setMonthlyPayment(calculatedMonthlyPayment);
            }
          }}
        >
          Calculate
        </Button>
        <div className="col-span-2 border p-2 rounded-xl shadow pt-4">
          <h1 className="border-b pb-2 mb-2 text-cyan-500 text-bold">
            Selected Cohort
          </h1>
          {cohorts
            .filter((item) => item.id === cohortId)
            .map((cohort) => (
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
                  <span>{cohort.payoffMonth.month} Months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Revenue Share Type</span>
                  <span>{cohort.revenueShareType.type}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span>Revenue Projection Type</span>
                  <span>{cohort.revenueProjectionType.type}</span>
                </div>
              </div>
            ))}
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
            <div className="flex items-center border-b justify-between">
              <span>Monthly Payment</span>
              <span>{monthlyPayment.toLocaleString()} ETB</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span>Total Repayment</span>
              <span>{totalRepayment.toLocaleString()} ETB</span>
            </div>
            <div className="flex items-center justify-between text-xl font-bold text-cyan-500 py-1 border-t">
              <span>Borrowing Capacity</span>
              <span>{borrowingCapacity.toLocaleString()} ETB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowingCapacityCalculator;
