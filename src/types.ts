export interface ShortcutItem {
  id: string;
  label: string;
  keys: string[]; // e.g. ['⌘', 'Mezerník'] or ['⌘', '⇧', '4']
  description?: string;
  tags?: string[];
}

export interface ShortcutCategory {
  id: string;
  title: string;
  accentColor: string; // hex
  badgeBg: string; // tailwind or rgba
  borderColor: string;
  iconName: string;
  shortcuts: ShortcutItem[];
}

export type ViewMode = 'preview' | 'full' | 'html';
