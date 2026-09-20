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
    <div className="sticky top-0 z-30 w-full bg-black/95 backdrop-blur">
      <div className="flex gap-3 overflow-x-auto px-8 py-3 scrollbar-none">
        {VIDEO_CATEGORIES_CONFIG.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryChange(category.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-black"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
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
