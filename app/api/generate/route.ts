import { NextResponse } from 'next/server';
import { generateStoreContent, type BrandInfo, type ProductInput } from '@/lib/ai-generator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brandInfo, products } = body as {
      brandInfo: BrandInfo;
      products: ProductInput[];
    };

    if (!brandInfo || !brandInfo.brandName) {
      return NextResponse.json(
        { error: 'Brand name is required' },
        { status: 400 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'At least one product is required' },
        { status: 400 }
      );
    }

    const generatedStore = generateStoreContent(brandInfo, products);

    return NextResponse.json({
      success: true,
      store: generatedStore
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate store content' },
      { status: 500 }
    );
  }
}
