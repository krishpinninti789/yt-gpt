"use client";

import { YouTubeSearchResult } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchVideoList from "../components/search/SearchVideoList";

const SearchPage = () => {
  const [videos, setVideos] = useState<YouTubeSearchResult[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const fetchSearchVideos = async () => {
    try {
      if (!query) return;

      const response = await fetch(
        `/api/videos/search?${searchParams.toString()}`,
      );

      const data = await response.json();

      setVideos(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSearchVideos();
  }, [query]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
      <h1 className="mb-6 text-xl font-semibold text-foreground">
        Search results for "{query}"
      </h1>

      <SearchVideoList videos={videos} />
    </main>
  );
};

export default SearchPage;
