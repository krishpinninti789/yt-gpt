"use client";
import React from "react";
import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import HistoryVideoList from "../components/history/HistoryVideoList";
import { useAuth } from "@/hooks/useAuth";
import { getHistory } from "@/actions/history.action";
import { HistoryVideo } from "@/utils/types";

const Page = () => {
  const { user, loading } = useAuth();
  const [videos, setVideos] = useState<HistoryVideo[]>([]);

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    const loadHistory = async () => {
      const history = await getHistory(user.uid);
      setVideos(history);
    };

    loadHistory();
  }, [loading, user]);

  return (
    <div>
      <AppShell>
        <HistoryVideoList videos={videos} />
      </AppShell>
    </div>
  );
};

export default Page;
