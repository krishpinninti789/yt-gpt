"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

type TopLoaderContextType = {
  start: () => void;
};

const TopLoaderContext = createContext<TopLoaderContextType | null>(null);

export const useTopLoader = () => {
  const context = useContext(TopLoaderContext);

  if (!context) {
    throw new Error("useTopLoader must be used inside TopLoaderProvider");
  }

  return context;
};

const TopLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const start = useCallback(() => {
    setIsCompleting(false);
    setIsLoading(true);
  }, []);

  /*
   * Whenever the URL changes, the navigation has completed.
   */
  useEffect(() => {
    if (!isLoading) return;

    setIsCompleting(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsCompleting(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, isLoading]);

  /*
   * Handle normal <Link> navigation.
   */
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        link.target === "_blank"
      ) {
        return;
      }

      start();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [start]);

  /*
   * Handle browser Back / Forward.
   */
  useEffect(() => {
    const handlePopState = () => {
      start();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [start]);

  return (
    <TopLoaderContext.Provider value={{ start }}>
      {children}

      {isLoading && (
        <div
          className={`fixed left-0 top-0 z-9999 h-0.5 bg-yellow-500 ${
            isCompleting
              ? "w-full opacity-0 transition-all duration-300"
              : "w-3/5 animate-top-loader"
          }`}
        />
      )}
    </TopLoaderContext.Provider>
  );
};

export default TopLoaderProvider;
