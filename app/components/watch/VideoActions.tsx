"use client";

import { ThumbsDown, ThumbsUp, Share2, Bookmark } from "lucide-react";

const VideoActions = () => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="flex items-center overflow-hidden rounded-full bg-gray-900">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-gray-800"
        >
          <ThumbsUp className="h-5 w-5" />
          <span>Like</span>
        </button>

        <div className="h-6 w-px bg-gray-700" />

        <button
          type="button"
          className="px-4 py-2.5 text-gray-200 transition hover:bg-gray-800"
          aria-label="Dislike"
        >
          <ThumbsDown className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-gray-800"
      >
        <Share2 className="h-5 w-5" />
        <span>Share</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-gray-800"
      >
        <Bookmark className="h-5 w-5" />
        <span>Save</span>
      </button>
    </div>
  );
};

export default VideoActions;
