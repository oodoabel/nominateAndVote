export function getImageUrl(photoUrl: string): string {
  if (!photoUrl) return "https://api.dicebear.com/9.x/avataaars/svg?seed=fallback";

  // 1. Handle Google Drive links
  if (photoUrl.includes("drive.google.com")) {
    const match = photoUrl.match(/[?&]id=([^&]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    // fallback for /open?id= format
    const idMatch = photoUrl.match(/open\?id=([\w-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  }

  // 2. Local filenames – assume they are in /public/images/ unless they start with a slash
  if (!photoUrl.startsWith("http")) {
    if (photoUrl.startsWith("/")) {
      return photoUrl;
    }
    return `/images/${photoUrl}`;
  }

  // 3. Already a direct image URL
  return photoUrl;
}
