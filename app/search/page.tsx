"use client";

import { YouTubeSearchResult } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchVideoList from "../components/search/SearchVideoList";
import SearchVideosShimmerList from "../components/loading-ui/SearchVideosShimmerList";
import SearchVideoShimmer from "../components/loading-ui/SearchVideoShimmer";

const SearchPage = () => {
  const [videos, setVideos] = useState<YouTubeSearchResult[]>([]);
  const [pageToken, setPageToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const loadMoreVideos = useCallback(async () => {
    if (isLoading) {
      return;
    }
    try {
      if (!query) return;
      setIsLoading(true);

      const params = new URLSearchParams();

      if (query) {
        params.set("query", query);
      }
      if (pageToken) params.set("pageToken", pageToken!);

      const response = await fetch(`/api/videos/search?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch more videos");
      }

      const data = await response.json();
      setVideos((previousVideos) => [...previousVideos, ...data.items]);
      setPageToken(data.nextPageToken);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [query, pageToken, isLoading]);

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
  }, [pageToken, isLoading]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
      <h1 className="mb-6 text-xl font-semibold text-foreground">
        Search results for "{query}"
      </h1>

      <SearchVideoList videos={videos} />
      <div ref={loaderRef} className="min-h-20">
        <SearchVideosShimmerList />
      </div>
    </main>
  );
};

export default SearchPage;
