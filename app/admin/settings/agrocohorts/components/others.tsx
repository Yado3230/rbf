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
import CapTableFrom from "./forms/land-size-form";
import { FamilySizeModal } from "./modals/family-size";
import { useFamilySizeModal } from "@/hooks/use-family-size-modal";
import { AgeModal } from "./modals/age";
import { useAgeModal } from "@/hooks/use-age-modal";

export const Others = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [capTables, setCapTables] = useState<CapTableResponse[]>([]);
  const [capTable, setCapTable] = useState<CapTableResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const familysizemodal = useFamilySizeModal();
  const agemodal = useAgeModal();
  const distance = useDistance();

  return (
    <>
      <FamilySizeModal
        isOpen={familysizemodal.isOpen}
        onClose={familysizemodal.onClose}
        onConfirm={familysizemodal.onClose}
        loading={loading}
      />
      <AgeModal
        isOpen={agemodal.isOpen}
        onClose={agemodal.onClose}
        onConfirm={agemodal.onClose}
        loading={loading}
      />
      <FamilySizeModal
        isOpen={familysizemodal.isOpen}
        onClose={familysizemodal.onClose}
        onConfirm={familysizemodal.onClose}
        loading={loading}
      />
      <div className="grid w-full gap-4">
        <div className="">
          <h3 className="text-xl font-medium leading-tight text-cyan-500">
            Others
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between px-1 space-x-4">
              <h4 className="text-sm font-semibold">Family size</h4>
              <div className="">
                <Button
                  size="icon"
                  className="bg-cyan-500"
                  disabled={loading}
                  onClick={familysizemodal.onOpen}
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
              <h4 className="text-sm font-semibold">Age</h4>{" "}
              <div className="">
                <Button
                  size="icon"
                  className="bg-cyan-500"
                  disabled={loading}
                  onClick={agemodal.onOpen}
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
              <h4 className="text-sm font-semibold">
                Distance from Coop Branch
              </h4>
              <div className="">
                <Button
                  size="icon"
                  className="bg-cyan-500"
                  disabled={loading}
                  onClick={distance.onOpen}
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
