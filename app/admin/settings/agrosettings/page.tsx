"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/heading";
import {
  Banknote,
  DollarSign,
  LayoutDashboard,
  LineChart,
  Speech,
  Tractor,
  Weight,
} from "lucide-react";
import Fainc from "./components/Fainc";
import Ftainc from "./components/Ftainc";

const AgroSettingsPage: React.FC = () => {
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
          <TabsTrigger value="fa" className="py-1">
            <LineChart className="w-5 h-5 mr-2" /> Forecasted Annual Income
          </TabsTrigger>
          <TabsTrigger value="fta" className="py-1">
            <Tractor className="w-5 h-5 mr-2" /> Forecasted Total Annual Farm
            Income
          </TabsTrigger>
          <TabsTrigger value="ftan" className="py-1">
            <DollarSign className="w-5 h-5 mr-2" /> Forecasted Total Annual
            non-farm Income
          </TabsTrigger>
          <TabsTrigger value="asset" className="py-1">
            <Banknote className="w-5 h-5 mr-2" /> Asset
          </TabsTrigger>
          <TabsTrigger value="social" className="py-1">
            <Speech className="w-5 h-5 mr-2" /> Social Capital
          </TabsTrigger>
          <TabsTrigger value="weight" className="py-1">
            <Weight className="w-5 h-5 mr-2" /> Weight
          </TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="summary"></TabsContent>
        <TabsContent value="fa">
          <Fainc />
        </TabsContent>
        <TabsContent value="fta">
          <Ftainc />
        </TabsContent>
        <TabsContent value="ftan"></TabsContent>
        <TabsContent value="asset"></TabsContent>
        <TabsContent value="social"></TabsContent>
        <TabsContent value="weight"></TabsContent>
      </Tabs>
    </div>
  );
};

export default AgroSettingsPage;
