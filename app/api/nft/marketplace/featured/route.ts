import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const featured = [
      {
        id: 'featured-1',
        name: 'Legendary Dragon #001',
        image: 'https://picsum.photos/600/600?random=dragon1',
        collection: { name: 'Digital Dragons', verified: true },
        price: '50.00',
        rarity: 'Mythic',
        featured: true,
        featuredReason: 'First Edition',
      },
      {
        id: 'featured-2',
        name: 'Cosmic Cat Supreme',
        image: 'https://picsum.photos/600/600?random=cat42',
        collection: { name: 'Cosmic Cats', verified: true },
        price: '35.50',
        rarity: 'Mythic',
        featured: true,
        featuredReason: 'Community Pick',
      },
    ];

    return NextResponse.json({ featured });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch featured' }, { status: 500 });
  }
}
