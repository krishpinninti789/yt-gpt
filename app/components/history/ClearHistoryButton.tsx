"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

type ClearHistoryButtonProps = {
  onClear: () => Promise<void>;
};

const ClearHistoryButton = ({ onClear }: ClearHistoryButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    try {
      setIsClearing(true);

      await onClear();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to clear history:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center cursor-pointer gap-2 rounded-lg px-3 py-2 text-sm font-medium text-(--muted-copy) transition-colors hover:bg-(--surface-elevated) hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
        Clear all
      </button>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        title="Clear watch history?"
        description="This will permanently remove all videos from your watch history. This action cannot be undone."
        confirmText="Clear all"
        isDeleting={isClearing}
        onConfirm={handleClear}
        onCancel={() => {
          if (!isClearing) {
            setIsModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default ClearHistoryButton;
