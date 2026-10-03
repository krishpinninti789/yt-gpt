export const dateToString = (rawDate: string) => {
  return new Date(rawDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const triggerHaptic = (duration = 10) => {
  if (typeof navigator === "undefined") return;

  navigator.vibrate?.(duration);
};
