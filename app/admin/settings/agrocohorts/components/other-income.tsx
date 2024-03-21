import React, { useState } from "react";
import AgroFrom from "./forms/agro-form";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";

export const OtherIncome = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weight: 0,
    intervalStart: 0,
    intervalEnd: 0,
    valueStart: 0,
    intervalIncrement: 0,
    valueIncrement: 0,
  });

  const calculateIntervalsAndValues = () => {
    const intervalsAndValues = [];

    if (formData.intervalIncrement !== 0) {
      let value = formData.valueStart;

      for (
        let interval = formData.intervalStart;
        interval <= formData.intervalEnd;
        interval += formData.intervalIncrement
      ) {
        intervalsAndValues.push({ interval, value });
        value += formData.valueIncrement;
      }
    }

    return intervalsAndValues;
  };

  const results = calculateIntervalsAndValues();

  return (
    <div className="grid w-full gap-4">
      <div>
        <h1 className="text-xl font-medium leading-tight text-cyan-500">
          Land Size in Hectare
        </h1>
        <AgroFrom
          setAddNew={setAddNew}
          updated={updated}
          setUpdated={setUpdated}
          setLoading={setLoading}
          loading={loading}
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
          {results.map((result, index) => (
            <div className="flex space-x-2" key={index}>
              <div className="grid w-full grid-cols-2 gap-2">
                <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                  {result.interval}
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
