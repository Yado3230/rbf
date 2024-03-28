import React, { useState } from "react";
import AgroFrom from "./forms/agro-form";
import CustomCollapsible from "./CustomCollapsible";
import { calculateIntervalsAndValues } from "@/utils/intervalUtils";
import { Asset } from "@/types/types";

interface Props {
  data: Asset[];
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

  const results: IntervalAndValue[] = calculateIntervalsAndValues(data[0]);
  // console.log(data[0]?);
  return (
    <div className="grid w-full gap-4">
      <div>
        <h1 className="text-xl font-medium leading-tight text-cyan-500">
          {data[0]?.assetDescription}
        </h1>
        <span className="font-mono text-sm">
          Weight({data[0]?.assetWeight}%) Standard({data[0]?.assetStandard})
        </span>
        <AgroFrom
          setAddNew={setAddNew}
          updated={updated}
          setUpdated={setUpdated}
          setLoading={setLoading}
          loading={loading}
          // data={data}
        />
      </div>
      <CustomCollapsible
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Land Size"
        content={results.map((result, index) => (
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
      />
    </div>
  );
};
