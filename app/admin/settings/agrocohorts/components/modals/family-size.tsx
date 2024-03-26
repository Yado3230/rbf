"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import AgroModalFrom from "../forms/agro-modal-form";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const FamilySizeModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const [addNew, setAddNew] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loading2, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    intervalStart: 0,
    intervalEnd: 0,
    valueStart: 0,
    intervalIncrement: 0,
    valueIncrement: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Modal title="Family Size" description="" isOpen={isOpen} onClose={onClose}>
      <div className="">
        <AgroModalFrom
          setAddNew={setAddNew}
          updated={updated}
          setUpdated={setUpdated}
          setLoading={setLoading}
          loading={loading}
          setFormData={setFormData}
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
