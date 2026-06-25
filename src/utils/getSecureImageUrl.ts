export function secureImageUrl(url: string) {
  return url.replace("http://", "https://")
}