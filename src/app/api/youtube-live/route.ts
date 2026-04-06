import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

type YouTubeLiveResponse = {
  isLive: boolean;
  videoId?: string;
};

const checkLiveStatus = unstable_cache(
  async (): Promise<YouTubeLiveResponse> => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) return { isLive: false };

    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;
      const res = await fetch(url);

      if (!res.ok) return { isLive: false };

      const data = await res.json();
      const videoId = data.items?.[0]?.id?.videoId as string | undefined;

      return { isLive: !!videoId, videoId };
    } catch {
      return { isLive: false };
    }
  },
  ['youtube-live-status'],
  { revalidate: 900 },
);

export async function GET() {
  const status = await checkLiveStatus();
  return NextResponse.json(status);
}
