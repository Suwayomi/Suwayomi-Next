import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SERVER_URL = "http://localhost:4567";

export function getImageUrl(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  
  // Ensure the path starts with / if it's relative
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SERVER_URL}${normalizedPath}`;
}
