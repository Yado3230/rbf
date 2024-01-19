import React from "react";
import BorrowingCapacityCalculator from "./BorrowingCapacityCalculator";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div>
      <Heading
        title={`Borrowing Capacity Calculator`}
        description="Calculate your borrowing capacity by providing monthly revenue"
      />
      <Separator className="my-2 mb-4" />
      <div className="grid gap-4">
        <BorrowingCapacityCalculator />
      </div>
    </div>
  );
};

export default Page;
