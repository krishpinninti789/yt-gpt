"use client";

import { VIDEO_CATEGORIES_CONFIG } from "@/utils/config/videoCategories-config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const VideoCategoryBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "all";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="sticky top-0 z-30 w-full border-b border-(--hairline) bg-(--background)/95 backdrop-blur">
      <div className="flex gap-2 overflow-x-auto px-5 py-3 scrollbar-none md:px-8">
        {VIDEO_CATEGORIES_CONFIG.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryChange(category.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-foreground text-background"
                  : "bg-(--surface-card) text-(--muted-copy) hover:bg-(--surface-elevated) hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCategoryBar;
