"use client";

import { ThumbsDown, ThumbsUp, Share2, Bookmark } from "lucide-react";

const VideoActions = () => {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <div className="flex items-center overflow-hidden rounded-lg border border-[var(--hairline-strong)] bg-[var(--surface-card)]">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-elevated)]"
        >
          <ThumbsUp className="h-5 w-5" />
          <span>Like</span>
        </button>

        <div className="h-6 w-px bg-[var(--hairline-strong)]" />

        <button
          type="button"
          className="px-4 py-2.5 text-[var(--foreground)] transition hover:bg-[var(--surface-elevated)]"
          aria-label="Dislike"
        >
          <ThumbsDown className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-lg border border-[var(--hairline-strong)] bg-[var(--surface-card)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-elevated)]"
      >
        <Share2 className="h-5 w-5" />
        <span>Share</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-lg border border-[var(--hairline-strong)] bg-[var(--surface-card)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-elevated)]"
      >
        <Bookmark className="h-5 w-5" />
        <span>Save</span>
      </button>
    </div>
  );
};

export default VideoActions;
