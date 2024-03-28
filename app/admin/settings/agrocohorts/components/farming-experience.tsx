import React, { useState } from "react";
import AgroFrom from "./forms/agro-form";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Asset } from "@/types/types";

interface Props {
  data: Asset[]; // Assuming data is an array of Asset objects
}

interface IntervalAndValue {
  interval: number;
  value: number;
}

export const FarmingExperience: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [addNew, setAddNew] = useState<string>("");
  const [updated, setUpdated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateIntervalsAndValues = (): IntervalAndValue[] => {
    const intervalsAndValues: IntervalAndValue[] = [];
    const asset = data[0];

    if (
      asset &&
      asset.assetIntervalStart !== undefined &&
      asset.assetIntervalEnd !== undefined &&
      asset.assetIncrement !== undefined &&
      asset.assetStartValue !== undefined &&
      asset.assetEndValue !== undefined &&
      asset.assetIntervalStart <= asset.assetIntervalEnd
    ) {
      let value: number = asset.assetStartValue;

      for (
        let interval: number = asset.assetIntervalStart;
        interval <= asset.assetIntervalEnd;
        interval += asset.assetIncrement
      ) {
        intervalsAndValues.push({ interval, value });
        value += asset.assetIncrement;
      }
    }

    return intervalsAndValues;
  };

  const results: IntervalAndValue[] = calculateIntervalsAndValues();

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
          // data={data}
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
