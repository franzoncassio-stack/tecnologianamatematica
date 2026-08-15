// Locale-independent decimal formatter to avoid SSR hydration mismatches
// between server (often en-US) and client (e.g. pt-BR uses comma as decimal).
export function formatDecimal(value: number, digits: number): string {
  const fixed = value.toFixed(digits);
  return fixed.replace(/\,/g, ".");
}
