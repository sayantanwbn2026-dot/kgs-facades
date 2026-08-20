import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a URL safe for use in <a href>, allowing only http(s), absolute
 * paths, and hash anchors. Anything else (including javascript:, data:,
 * vbscript:) falls back to "#".
 */
export function safeUrl(url: string | null | undefined): string {
  if (!url) return "#";
  const trimmed = String(url).trim();
  if (!trimmed) return "#";
  if (/^(https?:\/\/|#|\/(?!\/)|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return "#";
}
