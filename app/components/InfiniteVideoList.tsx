"use client";

import { useEffect, useRef, useState } from "react";
import { InfiniteVideoListProps } from "@/utils/types";
import VideoCard from "./VideoCard";
import VideoGridSkeleton from "./loading-ui/VideoGridSkeleton";

const InfiniteVideoList = ({
  initialVideos,
  initialNextPageToken,
  categoryId,
}: InfiniteVideoListProps) => {
  const [videos, setVideos] = useState(initialVideos);
  const [nextPageToken, setNextPageToken] = useState(initialNextPageToken);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMoreVideos = async () => {
    if (!nextPageToken || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (categoryId) {
        params.set("categoryId", categoryId);
      }

      params.set("pageToken", nextPageToken);

      const response = await fetch(`/api/videos?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch more videos");
      }

      const data = await response.json();

      setVideos((previousVideos) => [...previousVideos, ...data.items]);

      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Failed to load more videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [nextPageToken, isLoading]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 px-8 py-4">
        {videos.map((video) => (
          <VideoCard key={video.id} videoData={video} />
        ))}
      </div>

      <div ref={loaderRef}>{isLoading && <VideoGridSkeleton />}</div>
    </>
  );
};

export default InfiniteVideoList;
