
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    const apiKey = process.env.YOUTUBE_API_KEY;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=10&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar vídeos no YouTube');
    }

    const data = await response.json();

    const movies = data.items.map((item: any) => ({
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
      title: item.snippet.title,
    }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      error: 'Não foi possível buscar os vídeos',
    });
  }
}
