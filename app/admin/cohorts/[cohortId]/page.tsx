"use client";
import { getCohort } from "@/actions/cohorts-actions";
import { LevelForm } from "./components/level-form";
import { CohortResponse } from "@/types/types";
import { useEffect, useState } from "react";

const SizePage = async ({ params }: { params: { cohortId: string } }) => {
  const [cohort, setCohort] = useState<CohortResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getCohort(params.cohortId.toString());
        setCohort(res);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-col shadow">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LevelForm initialData={cohort ? cohort : null} />
      </div>
    </div>
  );
};

export default SizePage;
