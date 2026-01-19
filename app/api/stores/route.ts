import { NextResponse } from 'next/server';
import { createStore, getAllStores, getStoresByUserId } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (userId) {
    const stores = getStoresByUserId(userId);
    return NextResponse.json({ stores });
  }

  const allStores = getAllStores();
  return NextResponse.json({ stores: allStores });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      userId = 'demo-user',
      brandName,
      tagline,
      description,
      subdomain,
      themeId,
      colorScheme,
      products = [],
      published = false
    } = body;

    if (!brandName || !subdomain || !themeId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newStore = createStore({
      userId,
      brandName,
      tagline,
      description,
      subdomain,
      themeId,
      colorScheme,
      products,
      published
    });

    return NextResponse.json({ store: newStore }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create store' },
      { status: 500 }
    );
  }
}
