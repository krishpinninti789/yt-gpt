"use client";

import { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBackOnline(true);

      const timer = setTimeout(() => {
        setShowBackOnline(false);
      }, 3000);

      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBackOnline(false);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 animate-in slide-in-from-top-2 fade-in duration-300 bg-red-600 px-4 py-2 text-center text-sm text-white">
        You&apos;re offline. Some features may not work.
      </div>
    );
  }

  if (showBackOnline) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 animate-in slide-in-from-top-2 fade-in duration-300 bg-green-600 px-4 py-2 text-center text-sm text-white">
        You&apos;re back online.
      </div>
    );
  }

  return null;
};

export default NetworkStatus;
