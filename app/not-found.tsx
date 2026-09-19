import Link from "next/link";
import { Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-black px-6 text-center text-white">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-900">
        <SearchX className="h-10 w-10 text-yellow-800" />
      </div>

      <h1 className="text-6xl font-bold tracking-tight">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>

      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-yellow-800 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-yellow-700 hover:shadow-lg hover:shadow-yellow-900/20"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
