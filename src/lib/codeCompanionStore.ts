import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { CCProject, CCFile, CCStore, SupportedLanguage } from './types/codeCompanion';

const DATA_PATH = path.join(process.cwd(), 'data', 'code-companion.json');

async function readStore(): Promise<CCStore> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as CCStore;
  } catch {
    return { projects: [], files: [] };
  }
}

async function writeStore(store: CCStore): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

export async function listProjects(): Promise<CCProject[]> {
  const store = await readStore();
  return store.projects.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getProject(id: string): Promise<CCProject | null> {
  const store = await readStore();
  return store.projects.find((p) => p.id === id) ?? null;
}

export async function createProject(
  name: string,
  description: string,
  language: SupportedLanguage
): Promise<CCProject> {
  const store = await readStore();
  const now = new Date().toISOString();
  const project: CCProject = {
    id: crypto.randomUUID(),
    name,
    description,
    language,
    createdAt: now,
    updatedAt: now,
  };
  store.projects.push(project);

  // Seed default file for each new project
  const file: CCFile = {
    id: crypto.randomUUID(),
    projectId: project.id,
    name: defaultFileName(language),
    language,
    content: defaultContent(language, name),
    createdAt: now,
    updatedAt: now,
  };
  store.files.push(file);

  await writeStore(store);
  return project;
}

export async function updateProject(
  id: string,
  updates: Partial<Pick<CCProject, 'name' | 'description' | 'language'>>
): Promise<CCProject | null> {
  const store = await readStore();
  const idx = store.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store.projects[idx] = { ...store.projects[idx], ...updates, updatedAt: new Date().toISOString() };
  await writeStore(store);
  return store.projects[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  const store = await readStore();
  const before = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  store.files = store.files.filter((f) => f.projectId !== id);
  await writeStore(store);
  return store.projects.length < before;
}

export async function listProjectFiles(projectId: string): Promise<CCFile[]> {
  const store = await readStore();
  return store.files.filter((f) => f.projectId === projectId);
}

export async function getFile(id: string): Promise<CCFile | null> {
  const store = await readStore();
  return store.files.find((f) => f.id === id) ?? null;
}

export async function createFile(
  projectId: string,
  name: string,
  language: SupportedLanguage,
  content = ''
): Promise<CCFile | null> {
  const store = await readStore();
  const project = store.projects.find((p) => p.id === projectId);
  if (!project) return null;

  const now = new Date().toISOString();
  const file: CCFile = { id: crypto.randomUUID(), projectId, name, language, content, createdAt: now, updatedAt: now };
  store.files.push(file);
  project.updatedAt = now;
  await writeStore(store);
  return file;
}

export async function updateFileContent(id: string, content: string): Promise<CCFile | null> {
  const store = await readStore();
  const idx = store.files.findIndex((f) => f.id === id);
  if (idx === -1) return null;

  const now = new Date().toISOString();
  store.files[idx] = { ...store.files[idx], content, updatedAt: now };

  const pIdx = store.projects.findIndex((p) => p.id === store.files[idx].projectId);
  if (pIdx !== -1) store.projects[pIdx].updatedAt = now;

  await writeStore(store);
  return store.files[idx];
}

export async function deleteFile(id: string): Promise<boolean> {
  const store = await readStore();
  const before = store.files.length;
  store.files = store.files.filter((f) => f.id !== id);
  await writeStore(store);
  return store.files.length < before;
}

function defaultFileName(language: SupportedLanguage): string {
  const map: Record<SupportedLanguage, string> = {
    typescript: 'index.ts',
    javascript: 'index.js',
    python: 'main.py',
    html: 'index.html',
    css: 'styles.css',
    json: 'data.json',
    markdown: 'README.md',
    sql: 'query.sql',
    bash: 'script.sh',
    rust: 'main.rs',
    go: 'main.go',
    java: 'Main.java',
  };
  return map[language] ?? 'index.ts';
}

function defaultContent(language: SupportedLanguage, projectName: string): string {
  switch (language) {
    case 'typescript':
      return `// ${projectName}\n\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n`;
    case 'javascript':
      return `// ${projectName}\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n`;
    case 'python':
      return `# ${projectName}\n\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nif __name__ == "__main__":\n    print(greet("World"))\n`;
    case 'html':
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${projectName}</title>\n</head>\n<body>\n  <h1>${projectName}</h1>\n  <p>Welcome to your Code Companion project.</p>\n</body>\n</html>\n`;
    case 'css':
      return `/* ${projectName} */\n\n:root {\n  --primary: #06b6d4;\n  --background: #020617;\n  --foreground: #ffffff;\n}\n\nbody {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n  background: var(--background);\n  color: var(--foreground);\n}\n`;
    case 'json':
      return `{\n  "name": "${projectName}",\n  "version": "1.0.0",\n  "description": "Code Companion project"\n}\n`;
    case 'markdown':
      return `# ${projectName}\n\nA Code Companion project.\n\n## Getting Started\n\nEdit this file to document your project.\n`;
    case 'sql':
      return `-- ${projectName}\n\nSELECT 'Hello, World!' AS greeting;\n`;
    case 'bash':
      return `#!/bin/bash\n# ${projectName}\n\necho "Hello, World!"\n`;
    case 'rust':
      return `// ${projectName}\n\nfn main() {\n    println!("Hello, World!");\n}\n`;
    case 'go':
      return `// ${projectName}\n\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n`;
    case 'java':
      return `// ${projectName}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`;
    default:
      return `// ${projectName}\n`;
  }
}
