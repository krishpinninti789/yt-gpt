"use client";

import { useEffect, useState } from "react";

const NetworkStatus = () => {
  // Keep the initial render identical on the server and client. The browser
  // status is read after hydration in the effect below.
  const [isOnline, setIsOnline] = useState(true);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    let backOnlineTimer: ReturnType<typeof setTimeout> | undefined;

    const handleOnline = () => {
      setIsOnline(true);
      setShowBackOnline(true);

      if (backOnlineTimer) {
        clearTimeout(backOnlineTimer);
      }

      backOnlineTimer = setTimeout(() => {
        setShowBackOnline(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBackOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    const statusCheckTimer = setTimeout(() => {
      setIsOnline(navigator.onLine);
    }, 0);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearTimeout(statusCheckTimer);
      if (backOnlineTimer) {
        clearTimeout(backOnlineTimer);
      }
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 animate-in slide-in-from-top-2 fade-in duration-300 bg-[var(--accent)] px-4 py-2 text-center text-sm text-[var(--background)]">
        You&apos;re offline. Some features may not work.
      </div>
    );
  }

  if (showBackOnline) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 animate-in slide-in-from-top-2 fade-in duration-300 bg-[#11ff99] px-4 py-2 text-center text-sm text-black">
        You&apos;re back online.
      </div>
    );
  }

  return null;
};

export default NetworkStatus;
