import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus, X } from "lucide-react";
import RiskForm from "./risk-form";
import { RiskResponse } from "@/types/types";
import { getAllRisks } from "@/actions/risk-action";

const Risks = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [risks, setRisks] = useState<RiskResponse[]>([]);
  const [risk, setRisk] = useState<RiskResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllRisks();
        setRisks(res);
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
        className="w-[600px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-1">
          <h4 className="text-sm font-semibold">Risk</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex space-x-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Risk Type
            </div>
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Percentage
            </div>
          </div>
          <Button
            size="icon"
            disabled={loading}
            className="bg-cyan-500"
            onClick={() => {
              setRisk(undefined);
              setAddNew("risks");
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <CollapsibleContent className="space-y-2">
          {risks.map((item) => (
            <div className="flex space-x-2" key={item.id}>
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  {item.type}
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  {item.percentage}
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                disabled={loading}
                onClick={() => {
                  setRisk(item);
                  setAddNew("risks");
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CollapsibleContent>
        {addNew === "risks" && (
          <RiskForm
            setAddNew={setAddNew}
            risk={risk}
            updated={updated}
            setUpdated={setUpdated}
            setLoading={setLoading}
            loading={loading}
          />
        )}
      </Collapsible>
    </div>
  );
};

export default Risks;
