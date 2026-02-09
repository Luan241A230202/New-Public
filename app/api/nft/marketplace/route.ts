import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

/**
 * GET /api/nft/marketplace
 * Browse NFT marketplace with filters
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'all';
    const sort = searchParams.get('sort') || 'recent';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Mock NFT listings
    const mockListings = Array.from({ length: limit }, (_, i) => ({
      id: `nft-${page * limit + i}`,
      tokenId: (page * limit + i).toString(),
      name: `NFT #${page * limit + i}`,
      description: 'Unique digital collectible',
      image: `https://picsum.photos/400/400?random=${page * limit + i}`,
      collection: {
        name: ['Cosmic Cats', 'Cyber Punks', 'Digital Dragons', 'Space Apes'][Math.floor(Math.random() * 4)],
        verified: Math.random() > 0.5,
      },
      price: (Math.random() * 10 + 0.1).toFixed(2),
      currency: 'ETH',
      seller: {
        address: `0x${Math.random().toString(16).substring(2, 10)}`,
      },
      rarity: ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'][Math.floor(Math.random() * 5)],
      views: Math.floor(Math.random() * 10000),
      favorites: Math.floor(Math.random() * 1000),
    }));

    return NextResponse.json({
      listings: mockListings,
      pagination: { page, limit, total: 1000, hasMore: page * limit < 1000 },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch marketplace' }, { status: 500 });
  }
}
