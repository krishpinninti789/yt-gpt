"use client";

import { useState } from "react";
import { VideoDescriptionProps } from "@/utils/types";

const VideoDescription = ({ video }: VideoDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = video.snippet.description;

  if (!description) {
    return null;
  }

  return (
    <section className="mt-5 rounded-lg border border-[var(--hairline-strong)] bg-[var(--surface-card)] p-5 text-sm leading-6 text-[var(--body-copy)]">
      <div
        className={`whitespace-pre-wrap ${isExpanded ? "" : "line-clamp-3"}`}
      >
        {description}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="mt-3 font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </section>
  );
};

export default VideoDescription;
