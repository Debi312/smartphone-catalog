export function getSecureUrl(url: string) {
  return url.replace("http://", "https://")
}