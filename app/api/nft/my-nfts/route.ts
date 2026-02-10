import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

/**
 * GET /api/nft/my-nfts
 * Get user's owned NFTs
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock user's NFTs
    const myNFTs = Array.from({ length: 12 }, (_, i) => ({
      id: `my-nft-${i}`,
      tokenId: i.toString(),
      name: `My NFT #${i}`,
      image: `https://picsum.photos/400/400?random=mynft-${i}`,
      collection: {
        name: ['Cosmic Cats', 'Cyber Punks', 'Digital Dragons'][i % 3],
        verified: true,
      },
      rarity: ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'][i % 5],
      acquiredAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      acquiredPrice: (Math.random() * 5).toFixed(2),
      currentFloorPrice: (Math.random() * 10).toFixed(2),
      attributes: [
        { trait_type: 'Background', value: ['Blue', 'Red', 'Green'][i % 3] },
        { trait_type: 'Body', value: ['Golden', 'Silver'][i % 2] },
      ],
    }));

    return NextResponse.json({
      nfts: myNFTs,
      total: myNFTs.length,
      totalValue: myNFTs.reduce((sum, nft) => sum + parseFloat(nft.currentFloorPrice), 0).toFixed(2),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
