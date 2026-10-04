"use client";

import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const VidoraAI = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!question.trim()) return;

    // AI integration will be added later.
    console.log("Question:", question);

    setQuestion("");
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

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-end gap-2 rounded-xl border border-(--hairline) bg-(--surface-deep) p-2 focus-within:border-white/20">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask something about this video..."
              rows={1}
              className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />

            <button
              type="submit"
              disabled={!question.trim()}
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
