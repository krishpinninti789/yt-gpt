import { Search } from "lucide-react";

const SearchEmptyState = () => {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-(--surface-elevated)">
        <Search className="size-7 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold text-foreground">
        Search for videos
      </h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Find videos, tutorials, music, entertainment, and more.
      </p>
    </div>
  );
};

export default SearchEmptyState;
