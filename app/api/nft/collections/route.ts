import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/nft/collections
 * List all NFT collections
 */
export async function GET(req: NextRequest) {
  try {
    const collections = [
      {
        id: 'cosmic-cats',
        name: 'Cosmic Cats',
        description: 'Cats exploring the cosmos',
        image: 'https://picsum.photos/600/600?random=cosmiccat',
        banner: 'https://picsum.photos/1200/400?random=cosmicbanner',
        totalSupply: 10000,
        owners: 5432,
        floorPrice: '0.5',
        volume24h: '125.50',
        verified: true,
        creator: '0x1234...abcd',
      },
      {
        id: 'cyber-punks',
        name: 'Cyber Punks',
        description: 'Futuristic punk avatars',
        image: 'https://picsum.photos/600/600?random=cyberpunk',
        banner: 'https://picsum.photos/1200/400?random=punkbanner',
        totalSupply: 8888,
        owners: 4200,
        floorPrice: '0.8',
        volume24h: '200.00',
        verified: true,
        creator: '0x5678...efgh',
      },
      {
        id: 'digital-dragons',
        name: 'Digital Dragons',
        description: 'Mythical dragons on the blockchain',
        image: 'https://picsum.photos/600/600?random=dragon',
        banner: 'https://picsum.photos/1200/400?random=dragonbanner',
        totalSupply: 5000,
        owners: 3100,
        floorPrice: '1.2',
        volume24h: '350.00',
        verified: true,
        creator: '0x9abc...ijkl',
      },
    ];

    return NextResponse.json({ collections });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
