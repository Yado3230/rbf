"use client";

import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { CohortType } from "@/types/types";

interface CohortClientProps {
  data: CohortType[];
}

const CohortClient: React.FC<CohortClientProps> = ({ data }) => {
  // const clientModal = useClientModal();

  return (
    <>
      <div className="flex border-b pb-2 items-center justify-between">
        <Heading
          title={`Cohorts (${data.length})`}
          description="Manage cohorts from here"
        />
        <div></div>
        <div>
          <Button size="sm" className="bg-cyan-500">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>
      <DataTable
        searchKey="name"
        clickable={false}
        columns={columns}
        data={data}
      />
    </>
  );
};

export default CohortClient;
