import { NextResponse } from 'next/server';
import { getFile, updateFileContent, deleteFile } from '@/lib/codeCompanionStore';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const file = await getFile(id);
  if (!file) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(file);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { content } = body as { content?: string };

  if (typeof content !== 'string') {
    return NextResponse.json({ message: 'content is required' }, { status: 400 });
  }

  const updated = await updateFileContent(id, content);
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteFile(id);
  if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
