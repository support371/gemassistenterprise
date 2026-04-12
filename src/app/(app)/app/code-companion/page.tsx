'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Code2, Loader2, X, Search } from 'lucide-react';
import ProjectCard from '@/components/code-companion/ProjectCard';
import type { CCProject, SupportedLanguage } from '@/lib/types/codeCompanion';

const APP_ID = '69d56080f9b17e53b437b91e';

const LANGUAGES: { label: string; value: SupportedLanguage; color: string }[] = [
  { label: 'TypeScript', value: 'typescript', color: 'text-blue-400' },
  { label: 'JavaScript', value: 'javascript', color: 'text-yellow-400' },
  { label: 'Python', value: 'python', color: 'text-green-400' },
  { label: 'HTML', value: 'html', color: 'text-orange-400' },
  { label: 'CSS', value: 'css', color: 'text-purple-400' },
  { label: 'JSON', value: 'json', color: 'text-yellow-300' },
  { label: 'Markdown', value: 'markdown', color: 'text-slate-300' },
  { label: 'SQL', value: 'sql', color: 'text-cyan-400' },
  { label: 'Bash', value: 'bash', color: 'text-green-300' },
  { label: 'Rust', value: 'rust', color: 'text-orange-400' },
  { label: 'Go', value: 'go', color: 'text-cyan-300' },
  { label: 'Java', value: 'java', color: 'text-red-400' },
];

interface ProjectWithCount extends CCProject {
  fileCount: number;
}

export default function CodeCompanionDashboard() {
  const [projects, setProjects] = useState<ProjectWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);

  // New project form state
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLang, setNewLang] = useState<SupportedLanguage>('typescript');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch(`/api/app-logs/${APP_ID}/log-user-in-app/dashboard`, { method: 'POST' }).catch(() => {});
  }, []);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const projectsRes = await fetch('/api/code-companion/projects').then((r) => r.json() as Promise<CCProject[]>);

      // Get file counts for each project in parallel
      const withCounts = await Promise.all(
        projectsRes.map(async (p) => {
          const files = await fetch(`/api/code-companion/projects/${p.id}/files`).then((r) =>
            r.ok ? r.json() : []
          );
          return { ...p, fileCount: Array.isArray(files) ? files.length : 0 };
        })
      );

      setProjects(withCounts);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/code-companion/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), description: newDesc.trim(), language: newLang }),
      });
      if (!res.ok) throw new Error('Failed to create project');
      await fetchProjects();
      setNewName('');
      setNewDesc('');
      setNewLang('typescript');
      setShowNewForm(false);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/code-companion/projects/${id}`, { method: 'DELETE' });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Code2 className="w-8 h-8 text-cyan-400" />
            Code Companion
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Browser-based IDE with Monaco Editor — write, edit, and manage code projects.
          </p>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors self-start sm:self-auto flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* New Project Modal */}
      {showNewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Project</h2>
              <button
                onClick={() => setShowNewForm(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Project Name *</label>
                <input
                  autoFocus
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); }}
                  placeholder="My Awesome Project"
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="What does this project do?"
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Primary Language</label>
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => setNewLang(lang.value)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        newLang === lang.value
                          ? 'bg-cyan-900/50 border-cyan-500 text-cyan-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <span className={lang.color}>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowNewForm(false)}
                className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim() || creating}
                className="flex-1 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Creating…
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Projects', value: projects.length },
          { label: 'Total Files', value: projects.reduce((s, p) => s + p.fileCount, 0) },
          {
            label: 'Languages',
            value: new Set(projects.map((p) => p.language)).size,
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      {projects.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name, language, or description…"
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Project grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin text-cyan-500" />
          <span className="text-sm">Loading projects…</span>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              fileCount={project.fileCount}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
            <Code2 className="w-8 h-8 text-slate-600" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">No projects yet</h3>
            <p className="text-slate-500 text-sm">Create your first project to start coding in the browser.</p>
          </div>
          <button
            onClick={() => setShowNewForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 text-sm">
          No projects match &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}
