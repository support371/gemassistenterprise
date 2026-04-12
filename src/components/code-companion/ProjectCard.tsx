'use client';

import { Code2, Calendar, FileCode, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { CCProject } from '@/lib/types/codeCompanion';

interface ProjectCardProps {
  project: CCProject;
  fileCount: number;
  onDelete: (id: string) => void;
}

const LANG_BADGE: Record<string, string> = {
  typescript: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  javascript: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
  python: 'bg-green-500/15 text-green-300 border-green-500/25',
  html: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  css: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  json: 'bg-yellow-500/15 text-yellow-200 border-yellow-500/25',
  markdown: 'bg-slate-500/15 text-slate-300 border-slate-500/25',
  rust: 'bg-orange-600/15 text-orange-400 border-orange-600/25',
  go: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  java: 'bg-red-500/15 text-red-300 border-red-500/25',
  sql: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  bash: 'bg-green-600/15 text-green-300 border-green-600/25',
};

export default function ProjectCard({ project, fileCount, onDelete }: ProjectCardProps) {
  const badge = LANG_BADGE[project.language] ?? 'bg-slate-500/15 text-slate-300 border-slate-500/25';
  const updated = new Date(project.updatedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <Code2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm leading-tight">{project.name}</h3>
            <span className={`inline-block mt-0.5 text-[10px] px-1.5 py-0.5 rounded border font-medium ${badge}`}>
              {project.language}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(project.id)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-950/60 text-slate-600 hover:text-red-400 transition-all"
          title="Delete project"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {project.description && (
        <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{project.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <FileCode className="w-3 h-3" />
            {fileCount} {fileCount === 1 ? 'file' : 'files'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {updated}
          </span>
        </div>
        <Link
          href={`/code-companion/editor?project=${project.id}`}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          Open
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
