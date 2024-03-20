"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CapTableResponse } from "@/types/types";
import AgeFrom from "../forms/age-form";
import MembershipStatusForm from "../forms/membership-status-form";


interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const MembershipStatusModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const [addNew, setAddNew] = useState("");
  const [capTable, setCapTable] = useState<CapTableResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading2, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Modal title="Membership Status" description="" isOpen={isOpen} onClose={onClose}>
      <div className="">
        <MembershipStatusForm
          setAddNew={setAddNew}
          updated={updated}
          setUpdated={setUpdated}
          setLoading={setLoading}
          loading={loading}
          capTable={capTable}
        />
      </div>
      <div className="flex items-center justify-end pt-6 space-x-2">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
