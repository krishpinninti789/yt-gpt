"use client";

import { sanitizeAIResponse } from "@/utils/ai/helpers";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

type VideoraAIPros = {
  videoId: string;
};

const VidoraAI = ({ videoId }: VideoraAIPros) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    setIsLoading(true);
    setError("");
    setAnswer("");
    try {
      const response = await fetch("/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId,
          question: trimmedQuestion,
        }),
      });

      const data: {
        success?: boolean;
        code?: string;
        response?: unknown;
        error?: string;
      } = await response.json();

      if (!response.ok) {
        if (data.code === "TRANSCRIPT_UNAVAILABLE") {
          setError(
            "Vidora AI isn't available for this video because a transcript isn't available.",
          );
        } else {
          setError(data.error || "Failed to get AI response");
        }

        return;
      }

      if (typeof data.response !== "string" || !data.response.trim()) {
        throw new Error("The AI returned an empty response. Please try again.");
      }

      setAnswer(sanitizeAIResponse(data.response));
      setQuestion("");
    } catch (error) {
      console.error("Vidora AI error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-(--hairline) bg-(--surface-card)">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-(--hairline) px-4 py-4 sm:px-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--surface-elevated)">
          <Bot className="size-5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold sm:text-base">Vidora AI</h2>

            <Sparkles className="size-4" />
          </div>

          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
            Ask anything about this video
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-5">
        {/* Empty state */}
        {!answer && !isLoading && !error && (
          <div className="mb-5 flex flex-col items-center justify-center py-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-(--surface-elevated)">
              <Sparkles className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-3 text-sm font-medium">
              Understand this video with AI
            </h3>

            <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground sm:text-sm">
              Ask questions, get explanations, or explore the important concepts
              from this video.
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="mb-5 rounded-xl bg-(--surface-elevated) p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background">
                <Sparkles className="size-4 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-32 animate-pulse rounded bg-gray-700" />
                <div className="h-3 w-48 animate-pulse rounded bg-gray-700" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Answer */}
        {answer && !isLoading && (
          <div className="mb-5 rounded-xl bg-(--surface-elevated) p-4">
            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
              {answer}
            </p>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-end gap-2 rounded-xl border border-(--hairline) bg-(--surface-deep) p-2 focus-within:border-white/20">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask something about this video..."
              rows={1}
              disabled={isLoading}
              className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              aria-label="Ask Vidora AI"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Send className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VidoraAI;
