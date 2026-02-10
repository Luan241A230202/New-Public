import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

/**
 * GET /api/nft/auctions
 * List active NFT auctions
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'active'; // active, ended, all
    const limit = parseInt(searchParams.get('limit') || '20');

    // Mock auctions
    const auctions = Array.from({ length: limit }, (_, i) => ({
      id: `auction-${i}`,
      nft: {
        id: `nft-${i}`,
        name: `Auction NFT #${i}`,
        image: `https://picsum.photos/400/400?random=auction-${i}`,
        collection: {
          name: ['Cosmic Cats', 'Cyber Punks', 'Digital Dragons'][i % 3],
          verified: true,
        },
        rarity: ['Rare', 'Epic', 'Legendary', 'Mythic'][i % 4],
      },
      startPrice: (Math.random() * 1 + 0.1).toFixed(2),
      currentBid: (Math.random() * 10 + 1).toFixed(2),
      bidCount: Math.floor(Math.random() * 50),
      startTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
      seller: `0x${Math.random().toString(16).substring(2, 10)}`,
      highestBidder: `0x${Math.random().toString(16).substring(2, 10)}`,
      status: 'active',
    }));

    return NextResponse.json({
      auctions,
      total: auctions.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch auctions' }, { status: 500 });
  }
}
