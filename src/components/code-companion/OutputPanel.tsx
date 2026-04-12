'use client';

import { useRef, useEffect } from 'react';
import { Terminal, X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export interface OutputEntry {
  type: 'info' | 'success' | 'error' | 'log';
  message: string;
  timestamp: string;
}

interface OutputPanelProps {
  entries: OutputEntry[];
  onClear: () => void;
}

const icons = {
  info: <Info className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />,
  success: <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />,
  error: <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />,
  log: null,
};

const textColors = {
  info: 'text-blue-300',
  success: 'text-green-300',
  error: 'text-red-300',
  log: 'text-slate-200',
};

export default function OutputPanel({ entries, onClear }: OutputPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  return (
    <div className="h-40 flex-shrink-0 border-t border-slate-800 bg-[#0d1117] flex flex-col">
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Terminal className="w-3.5 h-3.5" />
          Output
          {entries.length > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px]">
              {entries.length}
            </span>
          )}
        </div>
        <button
          onClick={onClear}
          className="p-1 rounded hover:bg-slate-800 text-slate-600 hover:text-slate-400 transition-colors"
          title="Clear output"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 font-mono text-xs space-y-1">
        {entries.length === 0 ? (
          <p className="text-slate-700 pt-1">Ready. Use Ctrl+S to save. Output will appear here.</p>
        ) : (
          entries.map((entry, i) => (
            <div key={i} className={`flex gap-2 items-start ${textColors[entry.type]}`}>
              {icons[entry.type]}
              <span className="text-slate-600 flex-shrink-0 tabular-nums">{entry.timestamp}</span>
              <span className="whitespace-pre-wrap break-all">{entry.message}</span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
