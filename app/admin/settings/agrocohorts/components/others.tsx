import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus } from "lucide-react";

import { Asset, CapTableResponse } from "@/types/types";
import { FamilySizeModal } from "./modals/family-size";
import { useFamilySizeModal } from "@/hooks/use-family-size-modal";
import { AgeModal } from "./modals/age";
import { useAgeModal } from "@/hooks/use-age-modal";
import { useDistanceModal } from "@/hooks/use-distance-modal";
import { DistanceModal } from "./modals/distance";
import {
  calculateIntervalsAndValues,
  // IntervalAndValue,
} from "@/utils/intervalUtils";
import CustomCollapsible from "./CustomCollapsible";

interface Props {
  familySize: Asset[];
  distance: Asset[];
}

interface IntervalAndValue {
  interval: number;
  value: number;
}

export const Others: React.FC<Props> = ({ familySize, distance }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [capTables, setCapTables] = useState<CapTableResponse[]>([]);
  const [capTable, setCapTable] = useState<CapTableResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const familysizemodal = useFamilySizeModal();
  const agemodal = useAgeModal();
  const distancemodal = useDistanceModal();

  const familySizeresults: IntervalAndValue[] = calculateIntervalsAndValues(
    familySize[0]
  );
  const distanceresults: IntervalAndValue[] = calculateIntervalsAndValues(
    distance[0]
  );

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
      <DistanceModal
        isOpen={distancemodal.isOpen}
        onClose={distancemodal.onClose}
        onConfirm={distancemodal.onClose}
        loading={loading}
      />
      <div className="grid w-full gap-4">
        <div className="">
          <h3 className="text-xl font-medium leading-tight text-cyan-500">
            Others
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CustomCollapsible
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            modal={true}
            type="family"
            title={
              familySize[0].assetDescription +
              " ---" +
              ` Weight(${familySize[0].assetWeight}%)` +
              ` Standard(${familySize[0].assetStandard})`
            }
            content={familySizeresults.map((result, index) => (
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

          <CustomCollapsible
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            modal={true}
            type="distance"
            title={
              distance[0].assetDescription +
              " ---" +
              ` Weight(${distance[0].assetWeight}%)` +
              ` Standard(${distance[0].assetStandard})`
            }
            content={distanceresults.map((result, index) => (
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
      </div>
    </>
  );
};
