'use client';

import { Save, GitBranch, CheckCircle, Loader2 } from 'lucide-react';
import type { CCFile } from '@/lib/types/codeCompanion';

const LANG_LABELS: Record<string, string> = {
  typescript: 'TypeScript', javascript: 'JavaScript', python: 'Python',
  html: 'HTML', css: 'CSS', json: 'JSON', markdown: 'Markdown',
  sql: 'SQL', bash: 'Bash', rust: 'Rust', go: 'Go', java: 'Java',
};

interface StatusBarProps {
  activeFile: CCFile | null;
  isSaving: boolean;
  lastSaved: string | null;
  isModified: boolean;
  onSave: () => void;
}

export default function StatusBar({ activeFile, isSaving, lastSaved, isModified, onSave }: StatusBarProps) {
  return (
    <div className="h-6 flex items-center justify-between px-3 bg-cyan-950/60 border-t border-cyan-900/40 text-[11px] text-cyan-400/70 flex-shrink-0 select-none">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <GitBranch className="w-3 h-3" />
          main
        </span>
        <span className="text-slate-600">Code Companion</span>
      </div>

      <div className="flex items-center gap-4">
        {activeFile && (
          <>
            <span>{LANG_LABELS[activeFile.language] ?? activeFile.language}</span>
            <span className="text-slate-600">UTF-8</span>
            {isSaving ? (
              <span className="flex items-center gap-1 text-cyan-400/60">
                <Loader2 className="w-3 h-3 animate-spin" />
                Saving…
              </span>
            ) : isModified ? (
              <button
                onClick={onSave}
                className="flex items-center gap-1 text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                <Save className="w-3 h-3" />
                Save (Ctrl+S)
              </button>
            ) : lastSaved ? (
              <span className="flex items-center gap-1 text-green-400/60">
                <CheckCircle className="w-3 h-3" />
                Saved {lastSaved}
              </span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
