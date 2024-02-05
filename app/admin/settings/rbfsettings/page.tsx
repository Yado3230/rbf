"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User } from "lucide-react";
import React from "react";
import Drivers from "./components/Drivers";
import CapTables from "./components/CapTables";
import Risks from "./components/Risks";
import Types from "./components/Types";
import { Heading } from "@/components/ui/heading";

const Page = () => {
  return (
    <div>
      <div className="mb-4">
        <Heading
          title={`Settings`}
          description="Manage all metrixs from here (payoff month, risk, revenue drivers and types)"
        />
        <Separator className="my-2" />
      </div>
      <Tabs defaultValue="cap-table" className="w-full">
        <TabsList className="flex items-center justify-start mb-4">
          <TabsTrigger value="cap-table" className="py-1">
            <Lock className="w-5 h-5 mr-2" /> Cap Table
          </TabsTrigger>
          <TabsTrigger value="drivers" className="py-1">
            <Lock className="w-5 h-5 mr-2" /> Drivers
          </TabsTrigger>
          <TabsTrigger value="types" className="py-1">
            <Lock className="w-5 h-5 mr-2" /> Types
          </TabsTrigger>
          <TabsTrigger value="risks" className="py-1">
            <Lock className="w-5 h-5 mr-2" /> Risk
          </TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="cap-table">
          <CapTables />
        </TabsContent>
        <TabsContent value="drivers">
          <Drivers />
        </TabsContent>
        <TabsContent value="types">
          <Types />
        </TabsContent>
        <TabsContent value="risks">
          <Risks />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
