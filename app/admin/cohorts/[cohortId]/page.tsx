"use client";
import { getCohort } from "@/actions/cohorts-actions";
import { CohortResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { MainForm } from "./components/MainForm";

const SizePage = async ({ params }: { params: { cohortId: string } }) => {
  const [cohort, setCohort] = useState<CohortResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getCohort(params.cohortId.toString());
        if (Array.isArray(res)) {
          setCohort(res);
        } else {
          throw new Error("Invalid data format: expected an array");
        }
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [1000131333416]);

  return (
    <div className="flex-col shadow">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* <LevelForm initialData={cohort ? cohort : null} /> */}
        <MainForm initialData={cohort ? cohort : null} />
      </div>
    </div>
  );
};

export default SizePage;
