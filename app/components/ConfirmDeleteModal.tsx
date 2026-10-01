"use client";

import { ConfirmDeleteModalProps } from "@/utils/types";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDeleteModal = ({
  isOpen,
  title,
  description,
  confirmText = "Delete",
  isDeleting = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-xs"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        className="w-full max-w-md rounded-2xl border border-(--hairline) bg-background p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>

            <h2
              id="delete-modal-title"
              className="text-lg font-semibold text-foreground"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            aria-label="Close"
            className="rounded-full p-1.5 cursor-pointer text-(--muted-copy) transition-colors hover:bg-(--surface-elevated) hover:text-foreground disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p
          id="delete-modal-description"
          className="mt-4 text-sm leading-6 text-(--muted-copy)"
        >
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg px-4 py-2 cursor-pointer text-sm font-medium text-(--muted-copy) transition-colors hover:bg-(--surface-elevated) hover:text-foreground disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-red-600 px-4 py-2 cursor-pointer text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
