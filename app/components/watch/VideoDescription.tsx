"use client";

import { useState } from "react";
import { VideoDescriptionProps, YouTubeVideo } from "@/utils/types";

const VideoDescription = ({ video }: VideoDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = video.snippet.description;

  if (!description) {
    return null;
  }

  return (
    <section className="mt-5 rounded-xl bg-gray-900 p-4 text-sm text-gray-200">
      <div
        className={`whitespace-pre-wrap ${isExpanded ? "" : "line-clamp-3"}`}
      >
        {description}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="mt-3 font-semibold text-white hover:text-gray-300 cursor-pointer"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </section>
  );
};

export default VideoDescription;
