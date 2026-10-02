"use client";

import { HistoryVideo, HistoryVideoCardProps } from "@/utils/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { dateToString } from "@/utils/utils";

const HistoryVideoCard = ({ video, onRemove }: HistoryVideoCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    try {
      setIsRemoving(true);

      await onRemove(video.videoId);

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to remove history item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <div className="group flex flex-col md:flex-row gap-4 rounded-xl p-2 transition-colors hover:bg-(--surface-elevated)">
        <Link
          href={`/watch/${video.videoId}`}
          className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl sm:w-56 md:w-72"
        >
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 288px"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        <div className="flex w-full flex-row justify-between">
          <div className="min-w-0 flex-1 py-1">
            <Link href={`/watch/${video.videoId}`}>
              <h2 className="line-clamp-2 text-base font-semibold text-foreground">
                {video.title}
              </h2>

              <p className="mt-2 text-sm text-(--muted-copy)">
                {video.channelTitle}
              </p>

              {video.watchedAt && (
                <p className="mt-2 text-sm text-(--muted-copy)">
                  Watched {dateToString(video.watchedAt)}
                </p>
              )}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            aria-label={`Remove ${video.title} from history`}
            title="Remove from history"
            className="h-fit shrink-0 rounded-full cursor-pointer p-2 text-(--muted-copy) transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        title="Remove from history?"
        description={`"${video.title}" will be removed from your watch history.`}
        confirmText="Remove"
        isDeleting={isRemoving}
        onConfirm={handleRemove}
        onCancel={() => {
          if (!isRemoving) {
            setIsDeleteModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default HistoryVideoCard;
