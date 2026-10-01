"use client";

import { db } from "@/utils/config/firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { AddToHistoryParams, HistoryVideo } from "@/utils/types";

export async function addToHistory({
  userId,
  videoId,
  title,
  thumbnail,
  channelId,
  channelTitle,
}: AddToHistoryParams) {
  if (!userId || !videoId) {
    throw new Error("userId and videoId are required");
  }

  const historyRef = doc(db, "users", userId, "history", videoId);

  await setDoc(historyRef, {
    videoId,
    title,
    thumbnail,
    channelId,
    channelTitle,
    watchedAt: serverTimestamp(),
  });

  return { success: true };
}

export async function getHistory(userId: string): Promise<HistoryVideo[]> {
  if (!userId) {
    throw new Error("userId is required");
  }

  const historyRef = collection(db, "users", userId, "history");

  const historyQuery = query(historyRef, orderBy("watchedAt", "desc"));

  const snapshot = await getDocs(historyQuery);

  return snapshot.docs.map((historyDoc) => {
    const data = historyDoc.data();
    const watchedAt = data.watchedAt;

    return {
      videoId: data.videoId ?? historyDoc.id,
      title: data.title ?? "",
      thumbnail: data.thumbnail ?? "",
      channelTitle: data.channelTitle ?? "",
      watchedAt:
        watchedAt && typeof watchedAt.toDate === "function"
          ? watchedAt.toDate().toISOString()
          : null,
    };
  });
}

export async function removeFromHistory(userId: string, videoId: string) {
  if (!userId || !videoId) {
    throw new Error("userId and videoId are required");
  }

  await deleteDoc(doc(db, "users", userId, "history", videoId));

  return { success: true };
}

export async function clearHistory(userId: string) {
  if (!userId) {
    throw new Error("userId is required");
  }

  const historyRef = collection(db, "users", userId, "history");

  const snapshot = await getDocs(historyRef);

  await Promise.all(
    snapshot.docs.map((historyDoc) => deleteDoc(historyDoc.ref)),
  );

  return { success: true };
}
