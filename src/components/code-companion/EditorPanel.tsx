'use client';

import { useRef, useCallback } from 'react';
import Editor, { type OnMount, type OnChange } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import type { SupportedLanguage } from '@/lib/types/codeCompanion';

interface EditorPanelProps {
  language: SupportedLanguage;
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
  readOnly?: boolean;
}

export default function EditorPanel({ language, value, onChange, onSave, readOnly = false }: EditorPanelProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = useCallback(
    (ed, monaco) => {
      editorRef.current = ed;

      // Ctrl+S / Cmd+S to save
      if (onSave) {
        ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
          onSave();
        });
      }
    },
    [onSave]
  );

  const handleChange: OnChange = useCallback(
    (val) => {
      if (val !== undefined) onChange(val);
    },
    [onChange]
  );

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        language={language}
        value={value}
        theme="vs-dark"
        onChange={handleChange}
        onMount={handleMount}
        options={{
          fontSize: 14,
          fontFamily: '"Cascadia Code", "Fira Code", Menlo, monospace',
          fontLigatures: true,
          minimap: { enabled: true, scale: 1 },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          readOnly,
          padding: { top: 12, bottom: 12 },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: 'on',
          bracketPairColorization: { enabled: true },
          formatOnPaste: true,
          formatOnType: false,
          tabSize: 2,
          automaticLayout: true,
          renderLineHighlight: 'all',
          occurrencesHighlight: 'singleFile',
          suggest: { showKeywords: true },
          lineNumbers: 'on',
          glyphMargin: true,
          folding: true,
          links: true,
        }}
        loading={
          <div className="flex-1 flex items-center justify-center h-full bg-[#1e1e1e] text-slate-500 text-sm">
            Loading editor…
          </div>
        }
      />
    </div>
  );
}
