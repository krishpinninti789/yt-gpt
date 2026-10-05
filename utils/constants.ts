export const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

import { Brain, Lightbulb, ListChecks, Sparkles } from "lucide-react";

export const quickActions = [
  {
    label: "Summarize",
    icon: Sparkles,
    question: "Summarize this video",
  },
  {
    label: "Key takeaways",
    icon: ListChecks,
    question: "What are the key takeaways from this video?",
  },
  {
    label: "Explain",
    icon: Brain,
    question: "Explain the main concept of this video",
  },
  {
    label: "What did I learn?",
    icon: Lightbulb,
    question: "What are the most important things I can learn from this video?",
  },
];
