'use client';

import { X, FileCode } from 'lucide-react';
import type { CCFile } from '@/lib/types/codeCompanion';

interface EditorTabsProps {
  openFiles: CCFile[];
  activeFileId: string | null;
  modifiedIds: Set<string>;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}

export default function EditorTabs({
  openFiles, activeFileId, modifiedIds, onSelectTab, onCloseTab,
}: EditorTabsProps) {
  if (openFiles.length === 0) {
    return (
      <div className="h-9 border-b border-slate-800 bg-slate-900 flex items-center px-4">
        <span className="text-xs text-slate-600">Open a file from the explorer</span>
      </div>
    );
  }

  return (
    <div className="flex items-center overflow-x-auto bg-slate-900 border-b border-slate-800 h-9 flex-shrink-0">
      {openFiles.map((file) => {
        const isActive = file.id === activeFileId;
        const isModified = modifiedIds.has(file.id);

        return (
          <div
            key={file.id}
            className={`flex items-center gap-1.5 px-3 h-full text-xs border-r border-slate-800 cursor-pointer flex-shrink-0 transition-colors ${
              isActive
                ? 'bg-slate-800 text-white border-t-2 border-t-cyan-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            onClick={() => onSelectTab(file.id)}
          >
            <FileCode className="w-3 h-3 flex-shrink-0 text-slate-500" />
            <span className="max-w-[120px] truncate">{file.name}</span>
            {isModified && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" title="Unsaved changes" />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onCloseTab(file.id); }}
              className="p-0.5 rounded hover:bg-slate-700 text-slate-600 hover:text-slate-300 transition-colors flex-shrink-0"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
