"use client";

import { addToHistory } from "@/actions/history.action";
import { useAuth } from "@/hooks/useAuth";
import { YouTubeVideo } from "@/utils/types";
import { useEffect } from "react";

type HistoryTrackerProps = {
  video: YouTubeVideo;
};

const HistoryTracker = ({ video }: HistoryTrackerProps) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user || !video) {
      return;
    }

    const saveToHistory = async () => {
      try {
        await addToHistory({
          userId: user.uid,
          videoId: video.id,
          title: video.snippet.title,
          thumbnail:
            video.snippet.thumbnails.high?.url ??
            video.snippet.thumbnails.medium?.url ??
            "",
          channelId: video.snippet.channelId ?? "",
          channelTitle: video.snippet.channelTitle,
        });
      } catch (error) {
        console.error("Failed to add video to history:", error);
      }
    };

    saveToHistory();
  }, [user, loading, video]);

  return null;
};

export default HistoryTracker;
