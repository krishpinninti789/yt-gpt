"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const fetchSearchVideos = async () => {
    if (!query) return;

    const response = await fetch(
      `/api/videos/search?${searchParams.toString()}`,
    );

    const jsonRes = await response.json();

    console.log(jsonRes);
  };

  useEffect(() => {
    fetchSearchVideos();
  }, [query]);

  return <div>Search page: {query}</div>;
};

export default SearchPage;
