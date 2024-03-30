"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AgroCalculator = () => {
  const percentage = 66;

  return (
    <div className="grid grid-cols-4 mx-12">
      <div className="">
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={5}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: "round",
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            trailColor: "#f5f5f5",
          })}
        >
          <div
            className="font-bold text-[#3e98c7] text-xl"
            // style={{ fontSize: 20, fontWeight: "bold", color: "#3e98c7" }}
          >
            {`${percentage}%`}
          </div>
          <div className="text-[#999] mt-2 text-sm">Percentage</div>
        </CircularProgressbarWithChildren>
        <div className="flex flex-col items-center gap-8">
          {/* <div className="">some text</div> */}
          <div className="flex items-center w-full max-w-sm space-x-2">
            <Input type="number" placeholder="Account Number" />
            <Button type="submit">Calculate</Button>
          </div>
        </div>
      </div>
      <div className="col-span-3 ">
        <div className="grid grid-cols-2 gap-16 m-24">
          <div className="text-[#999] font-semibold text-lg">Description</div>
          <div className="text-[#999] font-semibold text-lg">Description</div>
          <div className="text-[#999] font-semibold text-lg">Description</div>
          <div className="text-[#999] font-semibold text-lg">Description</div>
        </div>
      </div>
    </div>
  );
};

export default AgroCalculator;
