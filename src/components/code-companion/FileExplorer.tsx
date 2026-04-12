'use client';

import { useState } from 'react';
import { Plus, FileCode, Trash2, ChevronDown, ChevronRight, FolderOpen } from 'lucide-react';
import type { CCFile, CCProject, SupportedLanguage } from '@/lib/types/codeCompanion';

interface FileExplorerProps {
  project: CCProject;
  files: CCFile[];
  activeFileId: string | null;
  onSelectFile: (file: CCFile) => void;
  onCreateFile: (name: string, language: SupportedLanguage) => Promise<void>;
  onDeleteFile: (id: string) => Promise<void>;
}

const LANGUAGES: { label: string; value: SupportedLanguage }[] = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'SQL', value: 'sql' },
  { label: 'Bash', value: 'bash' },
  { label: 'Rust', value: 'rust' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
];

function fileColor(name: string): string {
  const ext = name.split('.').pop() ?? '';
  const map: Record<string, string> = {
    ts: 'text-blue-400', tsx: 'text-blue-400',
    js: 'text-yellow-400', jsx: 'text-yellow-400',
    py: 'text-green-400',
    html: 'text-orange-400',
    css: 'text-purple-400',
    json: 'text-yellow-300',
    md: 'text-slate-300',
    sql: 'text-cyan-400',
    sh: 'text-green-300',
    rs: 'text-orange-500',
    go: 'text-cyan-300',
    java: 'text-red-400',
  };
  return map[ext] ?? 'text-slate-400';
}

export default function FileExplorer({
  project, files, activeFileId, onSelectFile, onCreateFile, onDeleteFile,
}: FileExplorerProps) {
  const [expanded, setExpanded] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLang, setNewLang] = useState<SupportedLanguage>('typescript');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  async function handleCreate() {
    if (!newName.trim()) return;
    await onCreateFile(newName.trim(), newLang);
    setNewName('');
    setCreating(false);
  }

  return (
    <div className="w-56 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 h-9">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          Explorer
        </button>
        <button
          onClick={() => setCreating(true)}
          className="p-1 rounded hover:bg-slate-700 text-slate-500 hover:text-white transition-colors"
          title="New file"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Project name */}
      <div className="px-3 py-1.5 flex items-center gap-2 border-b border-slate-800/50">
        <FolderOpen className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
        <span className="text-xs truncate font-medium text-slate-300">{project.name}</span>
      </div>

      {/* File list */}
      {expanded && (
        <div className="flex-1 overflow-y-auto py-1">
          {/* New file form */}
          {creating && (
            <div className="px-3 py-2 space-y-2 border-b border-slate-800 bg-slate-800/40">
              <input
                autoFocus
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreate();
                  if (e.key === 'Escape') { setCreating(false); setNewName(''); }
                }}
                placeholder="filename.ts"
                className="w-full px-2 py-1 text-xs bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <select
                value={newLang}
                onChange={(e) => setNewLang(e.target.value as SupportedLanguage)}
                className="w-full px-2 py-1 text-xs bg-slate-900 border border-slate-600 rounded text-slate-300 focus:outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
              <div className="flex gap-1">
                <button onClick={handleCreate} className="flex-1 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 rounded text-white transition-colors">Create</button>
                <button onClick={() => { setCreating(false); setNewName(''); }} className="flex-1 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors">Cancel</button>
              </div>
            </div>
          )}

          {files.map((file) => (
            <div
              key={file.id}
              className={`group flex items-center px-3 py-1.5 cursor-pointer transition-colors ${
                activeFileId === file.id ? 'bg-slate-700 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              onMouseEnter={() => setHoveredId(file.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectFile(file)}
            >
              <FileCode className={`w-3.5 h-3.5 mr-2 flex-shrink-0 ${fileColor(file.name)}`} />
              <span className="text-xs truncate flex-1">{file.name}</span>
              {hoveredId === file.id && (
                <button
                  onClick={(e) => { e.stopPropagation(); onDeleteFile(file.id); }}
                  className="p-0.5 rounded hover:bg-red-900/50 text-slate-600 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          {files.length === 0 && !creating && (
            <p className="px-3 py-6 text-xs text-slate-600 text-center">No files yet.<br />Click + to create one.</p>
          )}
        </div>
      )}
    </div>
  );
}
