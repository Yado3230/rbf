import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  content: React.ReactNode;
}

const CustomCollapsible: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  title,
  content,
}) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between px-1 space-x-4">
        <h4 className="text-sm font-semibold">{title}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <CaretSortIcon className="w-4 h-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="flex space-x-2">
        <div className="grid w-full grid-cols-2 gap-2">
          <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
            Interval
          </div>
          <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
            Value
          </div>
        </div>
      </div>
      <CollapsibleContent className="space-y-2">{content}</CollapsibleContent>
    </Collapsible>
  );
};

export default CustomCollapsible;
