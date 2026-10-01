"use client";

import {
  clearHistory,
  getHistory,
  removeFromHistory,
} from "@/actions/history.action";
import AppShell from "@/app/components/AppShell";
import HistoryVideoList from "@/app/components/history/HistoryVideoList";
import { useAuth } from "@/hooks/useAuth";
import { HistoryVideo } from "@/utils/types";
import { useEffect, useState } from "react";

const Page = () => {
  const { user, loading } = useAuth();

  const [videos, setVideos] = useState<HistoryVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      setVideos([]);
      setIsLoading(false);
      return;
    }

    const loadHistory = async () => {
      try {
        setIsLoading(true);

        const history = await getHistory(user.uid);

        setVideos(history);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [loading, user]);

  const handleRemove = async (videoId: string) => {
    if (!user) return;

    try {
      await removeFromHistory(user.uid, videoId);

      setVideos((currentVideos) =>
        currentVideos.filter((video) => video.videoId !== videoId),
      );
    } catch (error) {
      console.error("Failed to remove history item:", error);
    }
  };

  const handleClear = async () => {
    if (!user) return;

    try {
      await clearHistory(user.uid);

      setVideos([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <HistoryVideoList
          videos={videos}
          isLoading={isLoading}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </main>
    </AppShell>
  );
};

export default Page;
