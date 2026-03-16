import { unstable_cache } from 'next/cache';

type YouTubeLiveStatus = { isLive: true; videoId: string; title: string } | { isLive: false };

async function fetchYouTubeLiveStatus(): Promise<YouTubeLiveStatus> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return { isLive: false };
  }

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('channelId', channelId);
    url.searchParams.set('eventType', 'live');
    url.searchParams.set('type', 'video');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error('YouTube API error:', response.status, await response.text());
      return { isLive: false };
    }

    const data = (await response.json()) as {
      items?: { id: { videoId: string }; snippet: { title: string } }[];
    };

    if (!data.items || data.items.length === 0) {
      return { isLive: false };
    }

    return {
      isLive: true,
      videoId: data.items[0].id.videoId,
      title: data.items[0].snippet.title,
    };
  } catch (error) {
    console.error('Error checking YouTube live status:', error);
    return { isLive: false };
  }
}

export const getYouTubeLiveStatus = unstable_cache(fetchYouTubeLiveStatus, ['youtube-live-status'], {
  revalidate: 300,
});
