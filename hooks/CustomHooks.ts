// CustomHook.ts
import { getAllReturnCapTables } from "@/actions/cap-table-actions";
import {
  getAllRevenueProjectionTypes,
  getAllRevenueShareTypes,
} from "@/actions/types-action";
import {
  CapTableResponse,
  RevenueProjectionTypeResponse,
  RevenueShareTypeResponse,
} from "@/types/types";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

interface FormattedData {
  label: string;
  value: string;
  icon: React.ComponentType<any>; // Adjust the type based on the actual icon component type
}

interface UseDataFetchingResult {
  revenueProjectionTypes: FormattedData[];
  revenueShareTypes: FormattedData[];
  capTables: FormattedData[];
  error: any; // Adjust the type based on the actual error type
}

const useDataFetching = (): UseDataFetchingResult => {
  const [revenueProjectionTypes, setRevenueProjectionTypes] = useState<
    RevenueProjectionTypeResponse[]
  >([]);
  const [revenueShareTypes, setRevenueShareTypes] = useState<
    RevenueShareTypeResponse[]
  >([]);
  const [capTables, setCapTables] = useState<CapTableResponse[]>([]);
  const [error, setError] = useState<any>(null); // Adjust the type based on the actual error type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await getAllRevenueProjectionTypes();
        setRevenueProjectionTypes(res1);
        const res2 = await getAllRevenueShareTypes();
        setRevenueShareTypes(res2);
        const res3 = await getAllReturnCapTables();
        setCapTables(res3);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const formatData = (
    data: { type?: string; month?: string }[]
  ): FormattedData[] =>
    data.map((item) => ({
      label: item.type || item.month || "", // adjust the property accordingly
      value: item.type || item.month || "", // adjust the property accordingly
      icon: ArrowUp, // replace with the actual icon
    }));

  return {
    revenueProjectionTypes: formatData(revenueProjectionTypes),
    revenueShareTypes: formatData(revenueShareTypes),
    capTables: formatData(capTables),
    error,
  };
};

export default useDataFetching;
