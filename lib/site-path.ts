export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}
