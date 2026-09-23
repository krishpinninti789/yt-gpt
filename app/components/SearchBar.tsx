import { Search } from "lucide-react";
const SearchBar = () => {
  return (
    <div className="flex w-full items-center rounded-lg border border-[var(--hairline-strong)] bg-[var(--surface-card)] px-2 py-1.5 text-[var(--accent)] transition-all duration-300 ease-in-out focus-within:border-[var(--foreground)] sm:px-3">
      <input
        type="text"
        placeholder="Search"
        className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-copy)] focus:outline-none"
      />
      <button
        type="button"
        aria-label="Search"
        className="shrink-0 rounded-lg p-1.5 text-[var(--accent)] transition-colors hover:bg-[var(--surface-elevated)]"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};
export default SearchBar;
