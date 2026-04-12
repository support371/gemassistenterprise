import { NextResponse } from 'next/server';
import { listProjectFiles, createFile } from '@/lib/codeCompanionStore';
import type { SupportedLanguage } from '@/lib/types/codeCompanion';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const files = await listProjectFiles(id);
  return NextResponse.json(files);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { name, language = 'typescript', content = '' } = body as {
    name?: string;
    language?: SupportedLanguage;
    content?: string;
  };

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ message: 'name is required' }, { status: 400 });
  }

  const file = await createFile(id, name.trim(), language, content);
  if (!file) return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  return NextResponse.json(file, { status: 201 });
}
