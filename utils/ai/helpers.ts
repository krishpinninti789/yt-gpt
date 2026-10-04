export function sanitizeAIResponse(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // bold
    .replace(/__(.*?)__/g, "$1") // bold
    .replace(/\*(.*?)\*/g, "$1") // italic
    .replace(/_(.*?)_/g, "$1") // italic
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/^#{1,6}\s*/gm, "") // headings
    .trim();
}
