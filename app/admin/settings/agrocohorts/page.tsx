"use client";

import { useEffect, useState } from "react";
import { Asset } from "@/types/types";
import { fetchData } from "@/utils/fetchData";
import { getAsset } from "@/actions/agro-action";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/heading";
import { LandSize } from "./components/land-size";
import Summary from "./components/summary";
import { FarmingExperience } from "./components/farming-experience";
import { Others } from "./components/others";
import { Status } from "./components/status";
import { LiveStockSize } from "./components/livestock-size";
import { EducationLevel } from "./components/education";
import { OtherIncome } from "./components/other-income";
import {
  Cat,
  DollarSign,
  GraduationCap,
  LandPlot,
  LayoutDashboard,
  Plus,
  SlidersHorizontal,
  Tractor,
  Weight,
} from "lucide-react";

// Define types
interface TabDataMapping {
  [key: string]: string[];
}

const AgrocChortsSettingsPage: React.FC = () => {
  const [data, setData] = useState<Asset[] | null>(null);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const result = await getAsset();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataAsync();
  }, []);

  // Handle loading state
  if (!data) {
    return <div>Loading...</div>;
  }

  // Define a mapping between tab values and required data properties
  const tabDataMapping: TabDataMapping = {
    "land-size": ["LandSize"],
    "farming-experience": ["FarmExperience"],
    "other-income": ["OtherIncome"],
    "family-size": ["FamilySize"],
    distance: ["Distance"],
    livestock: ["LivestockSize"],
  };

  // Function to filter data based on tab value
  const getFilteredData = (tabValue: string): Asset[] => {
    const requiredDataNames = tabDataMapping[tabValue];
    return data.filter((item) => requiredDataNames.includes(item.assetName));
  };

  console.log(data);

  return (
    <div>
      <div className="mb-4">
        <Heading
          title={`Settings`}
          description="Manage all metrics from here"
        />
        <Separator className="my-2" />
      </div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="flex items-center justify-start mb-4">
          <TabsTrigger value="summary" className="py-1">
            <LayoutDashboard className="w-5 h-5 mr-2" /> Summary
          </TabsTrigger>
          <TabsTrigger value="land-size" className="py-1">
            <LandPlot className="w-5 h-5 mr-2" /> Land Size
          </TabsTrigger>
          <TabsTrigger value="farming-experience" className="py-1">
            <Tractor className="w-5 h-5 mr-2" /> Farming Experience
          </TabsTrigger>
          <TabsTrigger value="other-income" className="py-1">
            <DollarSign className="w-5 h-5 mr-2" /> Other Income
          </TabsTrigger>
          <TabsTrigger value="livestock" className="py-1">
            <Cat className="w-5 h-5 mr-2" /> Livestock size
          </TabsTrigger>
          <TabsTrigger value="education" className="py-1">
            <GraduationCap className="w-5 h-5 mr-2" /> Education
          </TabsTrigger>
          <TabsTrigger value="status" className="py-1">
            <SlidersHorizontal className="w-4 h-4 mr-2" /> Status
          </TabsTrigger>
          <TabsTrigger value="others" className="py-1">
            <Plus className="w-5 h-5 mr-2" /> Others
          </TabsTrigger>
          <TabsTrigger value="weight" className="py-1">
            <Weight className="w-5 h-5 mr-2" /> Weight
          </TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
        <TabsContent value="land-size">
          <LandSize data={getFilteredData("land-size")} />
        </TabsContent>
        <TabsContent value="farming-experience">
          <FarmingExperience data={getFilteredData("farming-experience")} />
        </TabsContent>
        <TabsContent value="other-income">
          <OtherIncome data={getFilteredData("other-income")} />
        </TabsContent>
        <TabsContent value="livestock">
          <LiveStockSize data={getFilteredData("livestock")} />
        </TabsContent>
        <TabsContent value="education">
          <EducationLevel />
        </TabsContent>
        <TabsContent value="status">
          <Status />
        </TabsContent>
        <TabsContent value="others">
          <Others
            familySize={getFilteredData("family-size")}
            distance={getFilteredData("distance")}
          />
        </TabsContent>
        <TabsContent value="weight">{/* <Others /> */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default AgrocChortsSettingsPage;
