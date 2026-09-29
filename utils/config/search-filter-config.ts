export const SEARCH_FILTER_CONFIG = [
  {
    id: "uploadDate",
    label: "Upload date",
    options: [
      { value: "hour", label: "Last hour" },
      { value: "today", label: "Today" },
      { value: "week", label: "This week" },
      { value: "month", label: "This month" },
      { value: "year", label: "This year" },
    ],
  },
  {
    id: "duration",
    label: "Duration",
    options: [
      { value: "short", label: "Short" },
      { value: "medium", label: "Medium" },
      { value: "long", label: "Long" },
    ],
  },
  {
    id: "order",
    label: "Sort by",
    options: [
      { value: "relevance", label: "Relevance" },
      { value: "date", label: "Upload date" },
      { value: "rating", label: "Rating" },
      { value: "viewCount", label: "View count" },
    ],
  },
] as const;
