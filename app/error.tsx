"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>

      <p className="mt-2 text-gray-500">
        We couldn&apos;t load the videos. Please try again.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
