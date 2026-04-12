import { NextResponse } from 'next/server';
import { listProjects, createProject } from '@/lib/codeCompanionStore';
import type { SupportedLanguage } from '@/lib/types/codeCompanion';

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { name, description = '', language = 'typescript' } = body as {
    name?: string;
    description?: string;
    language?: SupportedLanguage;
  };

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ message: 'name is required' }, { status: 400 });
  }

  const project = await createProject(name.trim(), description, language);
  return NextResponse.json(project, { status: 201 });
}
