"use client";
import { RelatedVideosProps, YouTubeSearchResult } from "@/utils/types";
import RelatedVideoCard from "./RelatedVideoCard";
import { useCallback, useEffect, useRef, useState } from "react";
import RelatedVideoShimmerList from "../loading-ui/RelatedVideoShimmerList";

const RelatedVideos = ({
  initialVideos,
  initialNextPageToken,
  title,
  categoryId,
  currentVideoId,
}: RelatedVideosProps) => {
  const [videos, setVideos] = useState(initialVideos);
  const [nextPageToken, setNextPageToken] = useState(initialNextPageToken);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMoreVideos = useCallback(async () => {
    if (!nextPageToken || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        title,
        categoryId,
        currentVideoId,
        pageToken: nextPageToken,
      });

      const response = await fetch(`/api/videos/related?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch related videos");
      }

      const data: {
        items: YouTubeSearchResult[];
        nextPageToken?: string;
      } = await response.json();

      setVideos((previousVideos) => [...previousVideos, ...data.items]);

      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Failed to load more related videos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [nextPageToken, isLoading, title, categoryId, currentVideoId]);

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
  }, [loadMoreVideos]);

  if (!videos) {
    return null;
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
        <h2 className="text-lg font-medium text-foreground">Related videos</h2>
      </div>

      <div className="flex flex-col gap-2">
        {videos.map((video) => (
          <RelatedVideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
      <div ref={loaderRef} className="h-1" aria-hidden="true" />

      {isLoading && (
        <div className="py-4 text-center text-sm text-gray-400">
          <RelatedVideoShimmerList />
        </div>
      )}
    </section>
  );
};

export default RelatedVideos;
