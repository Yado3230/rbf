"use client";

import useSWR from "swr";

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
import { fetchData } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import { getAsset } from "@/actions/agro-action";

const AgrocChortsSettingsPage = () => {
  
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   async function fetchDataAsync() {
  //     const result = await getAsset();
  //     setData(result);
  //   }
  //   fetchDataAsync();
  // }, []);

  // console.log(data);
  
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
          <LandSize />
        </TabsContent>
        <TabsContent value="farming-experience">
          <FarmingExperience />
        </TabsContent>
        <TabsContent value="other-income">
          <OtherIncome />
        </TabsContent>
        <TabsContent value="livestock">
          <LiveStockSize />
        </TabsContent>
        <TabsContent value="education">
          <EducationLevel />
        </TabsContent>
        <TabsContent value="status">
          <Status />
        </TabsContent>
        <TabsContent value="others">
          <Others />
        </TabsContent>
        <TabsContent value="weight">
          {/* <Others /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgrocChortsSettingsPage;
