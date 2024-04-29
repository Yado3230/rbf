import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus } from "lucide-react";
import { AssetResponse } from "@/types/types";
import { getFainc } from "@/actions/agro-action";
import AgroForm from "./agro-form";

const Fainc = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [largestWeight, setLargestWeight] = useState<number>(0);
  const [faincs, setFaincs] = useState<AssetResponse[]>([]);
  const [fainc, setFainc] = useState<AssetResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getFainc();
        setFaincs(res);
        let maxWeight = 0;
        res.forEach((item) => {
          if (item.weight && item.weight > maxWeight) {
            maxWeight = item.weight;
          }
        });
        setLargestWeight(maxWeight);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated]);
  return (
    <div className="grid gap-4 w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-1">
          <h4 className="text-sm font-semibold">
            Forecasted Annual Income
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex space-x-2">
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Start Value
            </div>
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              End Value
            </div>
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Weight (%)
            </div>
          </div>
          <Button
            size="icon"
            className="bg-cyan-500"
            disabled={loading}
            onClick={() => {
              setFainc(undefined);
              setAddNew("returnCapTable");
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <CollapsibleContent className="space-y-2">
          {faincs.map((item) => (
            <div className="flex space-x-2" key={item.id}>
              {/* {item.weight !== null &&
                item.weight > largestWeight &&
                setLargestWeight(item.weight)} */}
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  From {item.rangeStart} FAINC
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  To{" "}
                  {item.rangeEnd !== null && item.rangeEnd > 251
                    ? "♾️"
                    : item.rangeEnd}
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  {item.weight}%
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                disabled={loading}
                onClick={() => {
                  setFainc(item);
                  setAddNew("returnCapTable");
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CollapsibleContent>
        {addNew === "returnCapTable" && (
          <AgroForm
            setAddNew={setAddNew}
            updated={updated}
            setUpdated={setUpdated}
            setLoading={setLoading}
            loading={loading}
            agroData={fainc}
            largestWeight={largestWeight}
          />
        )}
      </Collapsible>
    </div>
  );
};

export default Fainc;
