import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus, X } from "lucide-react";
import ShareTypeForm from "./share-type-form";
import ProjectionTypeForm from "./projection-type-form";
import {
  RevenueProjectionTypeResponse,
  RevenueShareTypeResponse,
} from "@/types/types";
import {
  getAllRevenueProjectionTypes,
  getAllRevenueShareTypes,
} from "@/actions/types-action";

const Types = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenShare, setIsOpenShare] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [revenueProjectionTypes, setRevenueProjectionTypes] = useState<
    RevenueProjectionTypeResponse[]
  >([]);
  const [revenueShareTypes, setRevenueShareTypes] = useState<
    RevenueShareTypeResponse[]
  >([]);
  const [revenueProjectionType, setRevenueProjectionType] =
    useState<RevenueProjectionTypeResponse>();
  const [revenueShareType, setRevenueShareType] =
    useState<RevenueShareTypeResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllRevenueProjectionTypes();
        setRevenueProjectionTypes(res);
        const res2 = await getAllRevenueShareTypes();
        setRevenueShareTypes(res2);
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
    <div className="grid md:grid-cols-2 gap-4 w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-1">
          <h4 className="text-sm font-semibold">Revenue Projections Type</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex space-x-2">
          <div className="grid gap-2 w-full">
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Projection Type
            </div>
          </div>
          <Button
            size="icon"
            className="bg-cyan-500"
            onClick={() => {
              setRevenueProjectionType(undefined);
              setAddNew("projectionType");
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <CollapsibleContent className="space-y-2">
          {revenueProjectionTypes.map((item) => (
            <div className="flex space-x-2" key={item.id}>
              <div className="grid gap-2 w-full">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  {item.type}
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setRevenueProjectionType(item);
                  setAddNew("projectionType");
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CollapsibleContent>
        {addNew === "projectionType" && (
          <ProjectionTypeForm
            setAddNew={setAddNew}
            revenueProjectionType={revenueProjectionType}
            updated={updated}
            setUpdated={setUpdated}
            setLoading={setLoading}
            loading={loading}
          />
        )}
      </Collapsible>
      <Collapsible
        open={isOpenShare}
        onOpenChange={setIsOpenShare}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-1">
          <h4 className="text-sm font-semibold">Revenue Share Type</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex space-x-2">
          <div className="grid gap-2 w-full">
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Share Type
            </div>
          </div>
          <Button
            size="icon"
            className="bg-cyan-500"
            onClick={() => {
              setRevenueShareType(undefined);
              setAddNew("shareType");
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <CollapsibleContent className="space-y-2">
          {revenueShareTypes.map((item) => (
            <div className="flex space-x-2" key={item.id}>
              <div className="grid gap-2 w-full">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  {item.type}
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setRevenueShareType(item);
                  setAddNew("shareType");
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CollapsibleContent>
        {addNew === "shareType" && (
          <ShareTypeForm
            setAddNew={setAddNew}
            revenueShareType={revenueShareType}
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

export default Types;
