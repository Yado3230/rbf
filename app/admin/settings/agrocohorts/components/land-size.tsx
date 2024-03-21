import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus } from "lucide-react";

import { CapTableResponse } from "@/types/types";
import LandSizeFrom from "./forms/land-size-form";

export const LandSize = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [capTables, setCapTables] = useState<CapTableResponse[]>([]);
  const [capTable, setCapTable] = useState<CapTableResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    weight: 0,
    intervalStart: 0,
    intervalEnd: 0,
    valueStart: 0,
    intervalIncrement: 0,
    valueIncrement: 0,
  });

  // Function to calculate the intervals and values
  const calculateIntervalsAndValues = () => {
    const intervalsAndValues = [];
    let value = formData.valueStart; // Initialize value with valueStart

    // Check if intervalIncrement is non-zero to prevent infinite loop
    if (formData.intervalIncrement !== 0) {
      // Iterate over the intervals
      for (
        let interval = formData.intervalStart;
        interval <= formData.intervalEnd;
        interval += formData.intervalIncrement
      ) {
        // Push the interval and current value to the array
        intervalsAndValues.push({ interval, value });

        // Increment the value by valueIncrement
        value += formData.valueIncrement;
      }
    }

    return intervalsAndValues;
  };

  // Call the function to calculate intervals and values
  const results = calculateIntervalsAndValues();

  console.log(formData);

  return (
    <div className="grid w-full gap-4">
      <div className="">
        <h1 className="text-xl font-medium leading-tight text-cyan-500">
          Land Size in Hectare
        </h1>
        <LandSizeFrom
          setAddNew={setAddNew}
          updated={updated}
          setUpdated={setUpdated}
          setLoading={setLoading}
          loading={loading}
          capTable={capTable}
          setFormData={setFormData}
        />
      </div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between px-1 space-x-4">
          <h4 className="text-sm font-semibold">Land Size</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
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
              <div className="grid w-full grid-cols-2 gap-2">
                <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                  {item.month} Months
                </div>
                <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                  {item.fixedRevenueShareRate}
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
          {results.map((result, index) => (
            <div className="flex space-x-2" key={index}>
              <div className="grid w-full grid-cols-2 gap-2">
                <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                  {result.interval}{" "}
                </div>
                <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                  {result.value}
                </div>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
