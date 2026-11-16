/** Match every query word, regardless of spacing, case, punctuation or order. */
export function matchesSearch(text: string, query: string) {
  const normalize = (value: string) =>
    value
      .normalize("NFKD")
      .replace(/\p{M}/gu, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  const haystack = normalize(text);
  return normalize(query)
    .split(" ")
    .every((word) => haystack.includes(word));
}
