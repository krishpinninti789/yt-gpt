import { VideoCardProps } from "@/utils/types";
import millify from "millify";
import Image from "next/image";
import React from "react";

const VideoCard = ({ videoData }: VideoCardProps) => {
  const { snippet, statistics } = videoData;

  const thumbnail =
    snippet.thumbnails.high?.url ?? snippet.thumbnails.medium?.url;

  return (
    <article className="group flex cursor-pointer flex-col gap-y-3">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--surface-card)]">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={snippet.title}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Video information */}
      <div className="flex flex-col gap-y-1">
        <h3 className="line-clamp-2 text-[15px] font-medium leading-6 text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
          {snippet.title}
        </h3>

        <p className="text-sm text-[var(--body-copy)]">
          {snippet.channelTitle}
        </p>

        {statistics?.viewCount && (
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted-copy)]">
            {millify(Number(statistics?.viewCount ?? 0))} views
          </p>
        )}
      </div>
    </article>
  );
};

export default VideoCard;
