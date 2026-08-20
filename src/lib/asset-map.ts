// Maps legacy "/src/assets/xxx.jpg" strings stored in the CMS to their Vite-resolved URLs.
// When admins upload new files (Storage signed URLs) or paste external URLs, those are passed through.
const modules = import.meta.glob("/src/assets/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function resolveAsset(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/src/assets/")) {
    return modules[url] ?? url;
  }
  return url;
}