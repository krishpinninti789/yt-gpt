"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { SEARCH_FILTER_CONFIG } from "@/utils/config/search-filter-config";
import { useRouter, useSearchParams } from "next/navigation";

const SearchFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState({
    uploadDate: searchParams.get("uploadDate") ?? "",
    duration: searchParams.get("duration") ?? "",
    order: searchParams.get("order") ?? "relevance",
  });

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [filterId]: value,
    }));
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.uploadDate) {
      params.set("uploadDate", filters.uploadDate);
    } else {
      params.delete("uploadDate");
    }

    if (filters.duration) {
      params.set("duration", filters.duration);
    } else {
      params.delete("duration");
    }

    if (filters.order) {
      params.set("order", filters.order);
    } else {
      params.delete("order");
    }

    router.push(`/search?${params.toString()}`);

    setIsOpen(false);
  };

  const handleReset = () => {
    const params = new URLSearchParams();

    const query = searchParams.get("q");

    if (query) {
      params.set("q", query);
    }

    params.set("order", "relevance");

    setFilters({
      uploadDate: "",
      duration: "",
      order: "relevance",
    });

    router.push(`/search?${params.toString()}`);

    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Filter button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-(--hairline) bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-(--surface-elevated)"
      >
        <Filter className="h-4 w-4" />
        Filters
      </button>

      {/* Filter panel */}
      {isOpen && (
        <div className="absolute left-0 top-12 z-40 w-content rounded-xl border border-(--hairline) bg-background p-4 shadow-xl">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Filters</h2>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded-full p-1 text-(--muted-copy) hover:bg-(--surface-elevated) hover:text-foreground"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-5">
            {SEARCH_FILTER_CONFIG.map((filter) => (
              <div key={filter.id}>
                <h3 className="mb-2 text-sm font-medium text-foreground">
                  {filter.label}
                </h3>

                <div className="flex flex-col gap-2">
                  {filter.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-(--muted-copy) hover:bg-(--surface-elevated) hover:text-foreground"
                    >
                      <input
                        type="radio"
                        name={filter.id}
                        value={option.value}
                        className="accent-yellow-700"
                        checked={
                          filters[filter.id as keyof typeof filters] ===
                          option.value
                        }
                        onChange={() =>
                          handleFilterChange(filter.id, option.value)
                        }
                      />

                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-end gap-2 border-t border-(--hairline) pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg px-4 py-2 text-sm text-(--muted-copy) hover:bg-(--surface-elevated)"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
