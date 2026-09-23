"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>

      <p className="mt-2 text-[var(--muted-copy)]">
        We couldn&apos;t load the videos. Please try again.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:opacity-80"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
