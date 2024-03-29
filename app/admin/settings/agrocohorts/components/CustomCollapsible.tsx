import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMembershipStatusModal } from "@/hooks/use-membership-status";
import { MembershipStatusModal } from "./modals/membership-status";
import { LoanModal } from "./modals/loan-experience";
import { TrainingModal } from "./modals/training";
import { useLoanExperienceModal } from "@/hooks/use-loan-experience";
import { useTrainingModal } from "@/hooks/use-training-modal";
import { FamilySizeModal } from "./modals/family-size";
import { useDistanceModal } from "@/hooks/use-distance-modal";
import { useFamilySizeModal } from "@/hooks/use-family-size-modal";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  content: React.ReactNode;
  modal?: boolean;
  type?: string;
}

const CustomCollapsible: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  title,
  content,
  modal,
  type,
}) => {
  const loanExperience = useLoanExperienceModal();
  const membershipStatus = useMembershipStatusModal();
  const training = useTrainingModal();
  const familySize = useFamilySizeModal();
  const distance = useDistanceModal();

  return (
    <div className="">
      <MembershipStatusModal
        isOpen={membershipStatus.isOpen}
        onClose={membershipStatus.onClose}
        onConfirm={membershipStatus.onClose}
      />
      <LoanModal
        isOpen={loanExperience.isOpen}
        onClose={loanExperience.onClose}
        onConfirm={loanExperience.onClose}
      />
      <TrainingModal
        isOpen={distance.isOpen}
        onClose={distance.onClose}
        onConfirm={distance.onClose}
      />
      <FamilySizeModal
        isOpen={familySize.isOpen}
        onClose={familySize.onClose}
        onConfirm={familySize.onClose}
      />
      <Collapsible
        open={isOpen}
        onOpenChange={onOpenChange}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between px-1 space-x-4">
          <h4 className="text-sm font-semibold">{title}</h4>
          <div className="">
            {modal && (
              <Button
                size="icon"
                className="bg-cyan-500"
                onClick={membershipStatus.onOpen}
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="w-4 h-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
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
    </div>
  );
};

export default CustomCollapsible;
