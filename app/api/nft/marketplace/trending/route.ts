import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const trending = Array.from({ length: limit }, (_, i) => ({
      id: `trending-${i}`,
      tokenId: i.toString(),
      name: `Trending NFT #${i}`,
      image: `https://picsum.photos/400/400?random=trending-${i}`,
      collection: {
        name: ['Cosmic Cats', 'Cyber Punks', 'Digital Dragons'][i % 3],
        verified: true,
      },
      price: (Math.random() * 20 + 1).toFixed(2),
      priceChange24h: (Math.random() * 200 - 50).toFixed(2),
      volume24h: (Math.random() * 1000).toFixed(2),
      rarity: ['Epic', 'Legendary', 'Mythic'][i % 3],
    }));

    return NextResponse.json({ trending });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trending' }, { status: 500 });
  }
}
