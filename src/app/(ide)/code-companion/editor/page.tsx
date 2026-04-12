'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, Loader2, AlertCircle } from 'lucide-react';

import FileExplorer from '@/components/code-companion/FileExplorer';
import EditorTabs from '@/components/code-companion/EditorTabs';
import OutputPanel, { type OutputEntry } from '@/components/code-companion/OutputPanel';
import StatusBar from '@/components/code-companion/StatusBar';
import type { CCFile, CCProject, SupportedLanguage } from '@/lib/types/codeCompanion';

// Dynamically import Monaco to avoid SSR issues with heavy editor bundle
const EditorPanel = dynamic(() => import('@/components/code-companion/EditorPanel'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#1e1e1e] text-slate-600 text-sm gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      Loading editor…
    </div>
  ),
});

const APP_ID = '69d56080f9b17e53b437b91e';

function logPageView(pageName: string) {
  fetch(`/api/app-logs/${APP_ID}/log-user-in-app/${pageName}`, { method: 'POST' }).catch(() => {});
}

function EditorInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('project');

  const [project, setProject] = useState<CCProject | null>(null);
  const [files, setFiles] = useState<CCFile[]>([]);
  const [openFiles, setOpenFiles] = useState<CCFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [modifiedIds, setModifiedIds] = useState<Set<string>>(new Set());
  const [outputEntries, setOutputEntries] = useState<OutputEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Log page view on mount
  useEffect(() => {
    logPageView('editor');
  }, []);

  // Load project + files
  useEffect(() => {
    if (!projectId) {
      router.replace('/app/code-companion');
      return;
    }

    setLoading(true);
    fetch(`/api/code-companion/projects/${projectId}`)
      .then((r) => {
        if (!r.ok) throw new Error('Project not found');
        return r.json() as Promise<CCProject & { files: CCFile[] }>;
      })
      .then((data) => {
        const { files: f, ...proj } = data;
        setProject(proj);
        setFiles(f);
        // Auto-open first file
        if (f.length > 0) {
          const first = f[0];
          setOpenFiles([first]);
          setActiveFileId(first.id);
          setFileContents({ [first.id]: first.content });
        }
        addOutput('info', `Opened project: ${proj.name} (${f.length} file${f.length !== 1 ? 's' : ''})`);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [projectId, router]);

  function addOutput(type: OutputEntry['type'], message: string) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setOutputEntries((prev) => [...prev, { type, message, timestamp }]);
  }

  const activeFile = openFiles.find((f) => f.id === activeFileId) ?? null;

  function openFile(file: CCFile) {
    if (!openFiles.find((f) => f.id === file.id)) {
      setOpenFiles((prev) => [...prev, file]);
    }
    setActiveFileId(file.id);
    // Load content if not yet cached
    if (fileContents[file.id] === undefined) {
      setFileContents((prev) => ({ ...prev, [file.id]: file.content }));
    }
  }

  function closeTab(id: string) {
    const idx = openFiles.findIndex((f) => f.id === id);
    const next = openFiles.filter((f) => f.id !== id);
    setOpenFiles(next);

    if (activeFileId === id) {
      // Focus the adjacent tab
      const newActive = next[Math.min(idx, next.length - 1)]?.id ?? null;
      setActiveFileId(newActive);
    }

    // Drop cached content if not modified to free memory
    if (!modifiedIds.has(id)) {
      setFileContents((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    }
  }

  const handleEditorChange = useCallback(
    (value: string) => {
      if (!activeFileId) return;
      setFileContents((prev) => ({ ...prev, [activeFileId]: value }));
      setModifiedIds((prev) => new Set(prev).add(activeFileId));
    },
    [activeFileId]
  );

  const saveActiveFile = useCallback(async () => {
    if (!activeFileId || !modifiedIds.has(activeFileId)) return;
    const content = fileContents[activeFileId] ?? '';

    setIsSaving(true);
    try {
      const res = await fetch(`/api/code-companion/files/${activeFileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error('Save failed');

      setModifiedIds((prev) => {
        const next = new Set(prev);
        next.delete(activeFileId);
        return next;
      });

      const fileName = openFiles.find((f) => f.id === activeFileId)?.name ?? 'file';
      const ts = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLastSaved(ts);
      addOutput('success', `Saved ${fileName}`);
    } catch {
      addOutput('error', 'Failed to save file. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [activeFileId, fileContents, modifiedIds, openFiles]);

  // Auto-save after 3s of inactivity
  useEffect(() => {
    if (!activeFileId || !modifiedIds.has(activeFileId)) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveActiveFile();
    }, 3000);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [fileContents, activeFileId, modifiedIds, saveActiveFile]);

  async function handleCreateFile(name: string, language: SupportedLanguage) {
    if (!projectId) return;
    const res = await fetch(`/api/code-companion/projects/${projectId}/files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, language }),
    });
    if (!res.ok) { addOutput('error', 'Failed to create file'); return; }
    const newFile = (await res.json()) as CCFile;
    setFiles((prev) => [...prev, newFile]);
    openFile(newFile);
    addOutput('info', `Created ${name}`);
  }

  async function handleDeleteFile(id: string) {
    const file = files.find((f) => f.id === id);
    const res = await fetch(`/api/code-companion/files/${id}`, { method: 'DELETE' });
    if (!res.ok) { addOutput('error', 'Failed to delete file'); return; }
    setFiles((prev) => prev.filter((f) => f.id !== id));
    closeTab(id);
    addOutput('info', `Deleted ${file?.name ?? 'file'}`);
  }

  // --- Render states ---
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin text-cyan-500" />
        <span className="text-sm">Loading project…</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <p className="text-sm">{error ?? 'Project not found'}</p>
        <Link href="/app/code-companion" className="text-xs text-cyan-400 hover:text-cyan-300 underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Top toolbar */}
      <div className="h-10 flex items-center gap-3 px-3 bg-slate-900 border-b border-slate-800 flex-shrink-0">
        <Link
          href="/app/code-companion"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Projects
        </Link>
        <div className="w-px h-4 bg-slate-700" />
        <span className="text-xs font-semibold text-white truncate">{project.name}</span>
        <div className="flex-1" />
        <Link
          href="/app/code-companion"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-800"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </Link>
      </div>

      {/* Main IDE layout: sidebar + editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* File explorer sidebar */}
        <FileExplorer
          project={project}
          files={files}
          activeFileId={activeFileId}
          onSelectFile={openFile}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
        />

        {/* Editor + output area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar */}
          <EditorTabs
            openFiles={openFiles}
            activeFileId={activeFileId}
            modifiedIds={modifiedIds}
            onSelectTab={setActiveFileId}
            onCloseTab={closeTab}
          />

          {/* Monaco editor */}
          {activeFile ? (
            <EditorPanel
              key={activeFileId ?? 'empty'}
              language={activeFile.language}
              value={fileContents[activeFile.id] ?? activeFile.content}
              onChange={handleEditorChange}
              onSave={saveActiveFile}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-[#1e1e1e] text-slate-600">
              <span className="text-4xl">{'</>'}</span>
              <p className="text-sm">Select a file from the explorer to start editing</p>
            </div>
          )}

          {/* Output panel */}
          <OutputPanel entries={outputEntries} onClear={() => setOutputEntries([])} />
        </div>
      </div>

      {/* Status bar */}
      <StatusBar
        activeFile={activeFile}
        isSaving={isSaving}
        lastSaved={lastSaved}
        isModified={activeFileId ? modifiedIds.has(activeFileId) : false}
        onSave={saveActiveFile}
      />
    </>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin text-cyan-500" />
          <span className="text-sm">Loading editor…</span>
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}
