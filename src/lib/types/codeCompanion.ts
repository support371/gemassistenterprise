export type SupportedLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'sql'
  | 'bash'
  | 'rust'
  | 'go'
  | 'java';

export interface CCProject {
  id: string;
  name: string;
  description: string;
  language: SupportedLanguage;
  createdAt: string;
  updatedAt: string;
}

export interface CCFile {
  id: string;
  projectId: string;
  name: string;
  language: SupportedLanguage;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CCStore {
  projects: CCProject[];
  files: CCFile[];
}
