export type NavigationTab = 'download' | 'docs';

export type OSPlatform = 'windows' | 'mac' | 'linux';

export interface ShortcutItem {
  id: string;
  name: string;
  category: 'System' | 'Editor' | 'Navigation' | 'Workflow' | 'Window';
  keys: string[];
  description: string;
  actionSnippet?: string;
}

export interface FeatureCardItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: string;
  shortcuts?: string[];
  accentColor: string;
  metrics?: { label: string; value: string }[];
}

export interface DocSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  content: {
    heading: string;
    paragraphs: string[];
    codeSnippets?: {
      title: string;
      language: string;
      code: string;
    }[];
    callout?: {
      type: 'info' | 'tip' | 'warning';
      text: string;
    };
    shortcutsTable?: {
      action: string;
      keys: string[];
      scope: string;
    }[];
  }[];
}

export interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Settings' | 'Snippets' | 'System';
  shortcut?: string[];
  icon: string;
  perform: () => void;
}

export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  tag: string;
  highlights: string[];
  fixes: string[];
}
