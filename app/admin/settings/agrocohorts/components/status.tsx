import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Check, Edit, Plus } from "lucide-react";

import { CapTableResponse } from "@/types/types";
import { useLoanExperienceModal } from "@/hooks/use-loan-experience";
import { useMembershipStatusModal } from "@/hooks/use-membership-status";
import { useTrainingModal } from "@/hooks/use-training-modal";
import { MembershipStatusModal } from "./modals/membership-status";
import { TrainingModal } from "./modals/training";
import { LoanModal } from "./modals/loan-experience";

export const Status = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [capTables, setCapTables] = useState<CapTableResponse[]>([]);
  const [capTable, setCapTable] = useState<CapTableResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loanExperience = useLoanExperienceModal();
  const membershipStatus = useMembershipStatusModal();
  const training = useTrainingModal();

  return (
    <>
      <MembershipStatusModal
        isOpen={membershipStatus.isOpen}
        onClose={membershipStatus.onClose}
        onConfirm={membershipStatus.onClose}
        loading={loading}
      />
      <LoanModal
        isOpen={loanExperience.isOpen}
        onClose={loanExperience.onClose}
        onConfirm={loanExperience.onClose}
        loading={loading}
      />
      <TrainingModal
        isOpen={training.isOpen}
        onClose={training.onClose}
        onConfirm={training.onClose}
        loading={loading}
      />
      <div className="grid w-full gap-4">
        <div className="">
          <h3 className="text-xl font-medium leading-tight text-cyan-500">
            Status
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between px-1 space-x-4">
              <h4 className="text-sm font-semibold">Membership Status</h4>
              <div className="">
                <Button
                  size="icon"
                  className="bg-cyan-500"
                  disabled={loading}
                  onClick={membershipStatus.onOpen}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon className="w-4 h-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="grid w-full grid-cols-2 gap-2">
                <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                  Interval
                </div>
                <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                  Value
                </div>
              </div>
            </div>
            <CollapsibleContent className="space-y-2">
              {capTables.map((item) => (
                <div className="flex space-x-2" key={item.id}>
                  <div className="grid w-full grid-cols-3 gap-2">
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.month} Months
                    </div>
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.fixedRevenueShareRate}x of Principal
                    </div>
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.variableRevenueShareRate}x of Principal
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={loading}
                    onClick={() => {
                      setCapTable(item);
                      setAddNew("returnCapTable");
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between px-1 space-x-4">
              <h4 className="text-sm font-semibold">Loan Experience</h4>{" "}
              <div className="">
                <Button
                  size="icon"
                  className="bg-cyan-500"
                  disabled={loading}
                  onClick={loanExperience.onOpen}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon className="w-4 h-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="grid w-full grid-cols-2 gap-2">
                <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                  Interval
                </div>
                <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                  Value
                </div>
              </div>
            </div>
            <CollapsibleContent className="space-y-2">
              {capTables.map((item) => (
                <div className="flex space-x-2" key={item.id}>
                  <div className="grid w-full grid-cols-3 gap-2">
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.month} Months
                    </div>
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.fixedRevenueShareRate}x of Principal
                    </div>
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.variableRevenueShareRate}x of Principal
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={loading}
                    onClick={() => {
                      setCapTable(item);
                      setAddNew("returnCapTable");
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between px-1 space-x-4">
              <h4 className="text-sm font-semibold">Training</h4>
              <div className="">
                <Button
                  size="icon"
                  className="bg-cyan-500"
                  disabled={loading}
                  onClick={training.onOpen}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon className="w-4 h-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="grid w-full grid-cols-2 gap-2">
                <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                  Interval
                </div>
                <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                  Value
                </div>
              </div>
            </div>
            <CollapsibleContent className="space-y-2">
              {capTables.map((item) => (
                <div className="flex space-x-2" key={item.id}>
                  <div className="grid w-full grid-cols-3 gap-2">
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.month} Months
                    </div>
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.fixedRevenueShareRate}x of Principal
                    </div>
                    <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                      {item.variableRevenueShareRate}x of Principal
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={loading}
                    onClick={() => {
                      setCapTable(item);
                      setAddNew("returnCapTable");
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </>
  );
};
