import { NextResponse } from 'next/server';
import { getStoreById, updateStore, deleteStore } from '@/lib/store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStoreById(id);

  if (!store) {
    return NextResponse.json(
      { error: 'Store not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ store });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedStore = updateStore(id, body);

    if (!updatedStore) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ store: updatedStore });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update store' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = deleteStore(id);

  if (!success) {
    return NextResponse.json(
      { error: 'Store not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: 'Store deleted successfully' });
}
