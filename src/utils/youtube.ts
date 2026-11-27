export function getYouTubeVideoId(value: string): string {
  if (!value) return '';

  const input = value.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input.startsWith('http') ? input : `https://${input}`);
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
      const match = url.pathname.match(/^\/(?:shorts|embed|live)\/([a-zA-Z0-9_-]{11})/);
      if (match) return match[1];

      const videoId = url.searchParams.get('v');
      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) return videoId;
    }

    if (url.hostname === 'youtu.be') {
      const videoId = url.pathname.split('/')[1];
      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) return videoId;
    }
  } catch {
    return '';
  }

  return '';
}

export function getYouTubeThumbnail(link: string, image: string): string {
  const input = link?.trim() || '';
  if (!input) return image || '';

  try {
    const url = new URL(input);
    if (['http:', 'https:'].includes(url.protocol)) return input;
  } catch {
    // Check for a video ID or relative path below.
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return `https://i.ytimg.com/vi/${input}/hqdefault.jpg`;
  }
  if (input.startsWith('/')) return input;
  return image || '';
}
