import { NextResponse } from 'next/server';
import { getProject, updateProject, deleteProject, listProjectFiles } from '@/lib/codeCompanionStore';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  const files = await listProjectFiles(id);
  return NextResponse.json({ ...project, files });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const updated = await updateProject(id, body);
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteProject(id);
  if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
