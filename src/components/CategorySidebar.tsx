import { ShortcutCategory, ShortcutItem } from '../types';
import { PRESET_APPS, PresetApp } from '../data/presetApps';
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Palette,
  Eye,
  EyeOff,
  Sparkles,
  Download,
  Search,
  Check,
  Globe,
  Star,
  Layers,
  FileText,
  X,
  Music,
  Terminal,
  Laptop,
  LayoutGrid
} from 'lucide-react';
import React, { useState } from 'react';

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ShortcutCategory[];
  onUpdateCategoryColor: (categoryId: string, newColor: string) => void;
  onToggleFavorite: (shortcutId: string) => void;
  onAddShortcut: (categoryId: string, shortcut: ShortcutItem) => void;
  onRemoveShortcut: (shortcutId: string) => void;
  onAddNewCategory: (title: string, accentColor?: string, initialShortcuts?: ShortcutItem[]) => void;
  onDeleteCategory?: (categoryId: string) => void;
  theme?: 'night' | 'day';
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  isOpen,
  onClose,
  categories,
  onUpdateCategoryColor,
  onToggleFavorite,
  onAddShortcut,
  onRemoveShortcut,
  onAddNewCategory,
  onDeleteCategory,
  theme = 'night'
}) => {
  const isDay = theme === 'day';

  // Roletka state: set of expanded category IDs
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    favorites: true,
    logic_general: true
  });

  // State for "Moje zkratky" app builder
  const [newAppName, setNewAppName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<PresetApp | null>(null);
  const [customLabel, setCustomLabel] = useState('');
  const [customKeysText, setCustomKeysText] = useState('');
  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [showAddAppBox, setShowAddAppBox] = useState(false);
  const [autoMatchMessage, setAutoMatchMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleRoletka = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleAutoSearchPreset = (query: string) => {
    setNewAppName(query);
    if (!query.trim()) {
      setSelectedPreset(null);
      setAutoMatchMessage(null);
      return;
    }

    const q = query.toLowerCase().trim();
    const matched = PRESET_APPS.find(
      (app) => app.name.toLowerCase().includes(q) || app.id.toLowerCase().includes(q)
    );

    if (matched) {
      setSelectedPreset(matched);
      setAutoMatchMessage(`Našel jsem nápovědu pro "${matched.name}" (${matched.shortcuts.length} zkratek)`);
    } else {
      setSelectedPreset(null);
      setAutoMatchMessage(`Vytvoří se nová vlastní aplikace "${query}"`);
    }
  };

  const handleCreateAppCategory = () => {
    const title = newAppName.trim() || (selectedPreset ? selectedPreset.name : 'Moje Aplikace');

    let initialShortcuts: ShortcutItem[] = [];
    if (selectedPreset) {
      initialShortcuts = selectedPreset.shortcuts.map((s) => ({
        ...s,
        id: `auto-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
      }));
    }

    const randomColors = ['#0A84FF', '#30D158', '#FF9F0A', '#BF5AF2', '#FF375F', '#FFD60A'];
    const chosenColor = selectedPreset?.accentColor || randomColors[Math.floor(Math.random() * randomColors.length)];

    onAddNewCategory(title, chosenColor, initialShortcuts);

    setNewAppName('');
    setSelectedPreset(null);
    setAutoMatchMessage(null);
    setShowAddAppBox(false);
  };

  const handleQuickAddSingleShortcut = (categoryId: string) => {
    if (!customLabel.trim()) return;

    const keysArr = customKeysText.trim()
      ? customKeysText.split('+').map((k) => k.trim())
      : ['⌘', 'S'];

    const newShortcut: ShortcutItem = {
      id: `custom-${Date.now()}`,
      label: customLabel.trim(),
      keys: keysArr,
      isFavorite: false
    };

    onAddShortcut(categoryId, newShortcut);
    setCustomLabel('');
    setCustomKeysText('');
  };

  const handleImportTextOrJSON = (targetCatId: string) => {
    if (!importText.trim()) return;

    try {
      // Try parsing JSON first
      if (importText.trim().startsWith('[')) {
        const parsed = JSON.parse(importText);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            if (item.label && item.keys) {
              onAddShortcut(targetCatId, {
                id: `import-${Date.now()}-${Math.random()}`,
                label: item.label,
                keys: Array.isArray(item.keys) ? item.keys : [item.keys]
              });
            }
          });
          setImportText('');
          setShowImportBox(false);
          return;
        }
      }

      // Parse plain line format (e.g. "Cmd+C: Kopírovat" or "Ctrl+S - Uložit")
      const lines = importText.split('\n');
      lines.forEach((line) => {
        if (!line.trim()) return;
        const parts = line.split(/[:\-]/);
        if (parts.length >= 2) {
          const keysStr = parts[0].trim();
          const labelStr = parts.slice(1).join('-').trim();
          const keysArr = keysStr.split('+').map((k) => k.trim());
          onAddShortcut(targetCatId, {
            id: `import-${Date.now()}-${Math.random()}`,
            label: labelStr,
            keys: keysArr
          });
        }
      });
      setImportText('');
      setShowImportBox(false);
    } catch (e) {
      alert('Chyba při zpracování importu. Zkontrolujte formát textu.');
    }
  };

  return (
    <div className={`no-print w-80 sm:w-96 shrink-0 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 self-start sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden border ${
      isDay ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#16161A] border-amber-500/30 text-white'
    }`}>
      {/* Sidebar Header */}
      <div className={`p-4 border-b flex items-center justify-between ${
        isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#1A1A22] border-white/10'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-sm font-bold flex items-center gap-2 ${isDay ? 'text-slate-900' : 'text-white'}`}>
              Apps Kategorie
            </h2>
          </div>
        </div>
      </div>

      {/* "Moje Zkratky" & App Creator Toolbar */}
      <div className={`p-3 border-b space-y-2 ${
        isDay ? 'bg-slate-100/80 border-slate-200' : 'bg-[#1F1F28] border-white/10'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Správa kategorií ({categories.length})
          </span>
          <button
            type="button"
            onClick={() => setShowAddAppBox(!showAddAppBox)}
            className="px-2.5 py-1 text-[10.5pt] font-bold rounded-lg bg-gradient-to-r from-amber-500 to-purple-600 text-black shadow hover:brightness-110 flex items-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Přidat novou kategorii</span>
          </button>
        </div>

        {/* Expandable Add New App / Category Box */}
        {showAddAppBox && (
          <div className="p-3 rounded-xl bg-[#16161A] border border-amber-500/30 space-y-2.5 animate-in zoom-in-95">
            <div className="text-[10px] text-gray-300 font-medium">
              Zadejte název nové kategorie nebo aplikace (přednastavení jako <i>Photoshop, VS Code, Ableton, Figma</i> se automaticky vyhledají):
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={newAppName}
                onChange={(e) => handleAutoSearchPreset(e.target.value)}
                placeholder="Název kategorie / aplikace..."
                className="w-full bg-[#25252D] text-xs text-white pl-8 pr-3 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Presets quick buttons */}
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[9px] font-mono text-gray-400">Populární:</span>
              {PRESET_APPS.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    setNewAppName(app.name);
                    setSelectedPreset(app);
                    setAutoMatchMessage(`Načte se ${app.name} (${app.shortcuts.length} zkratek)`);
                  }}
                  className="text-[9.5pt] px-2 py-0.5 rounded bg-white/5 hover:bg-amber-500/20 text-gray-300 hover:text-amber-300 border border-white/10 transition-colors"
                >
                  {app.name}
                </button>
              ))}
            </div>

            {autoMatchMessage && (
              <div className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 p-1.5 rounded border border-emerald-500/20 flex items-center gap-1">
                <Globe className="w-3 h-3 shrink-0" />
                <span>{autoMatchMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddAppBox(false)}
                className="px-2.5 py-1 text-xs text-gray-400 hover:text-white"
              >
                Zrušit
              </button>
              <button
                type="button"
                onClick={handleCreateAppCategory}
                className="px-3 py-1 text-xs bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Přidat kategorii</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Categories List - Listed directly beneath each other */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl border border-white/10 bg-[#1F1F28] overflow-hidden shadow-sm"
          >
            {/* Category Header */}
            <div className="p-2.5 bg-[#25252D] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative flex items-center justify-center">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-white/30"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                  <input
                    type="color"
                    value={cat.accentColor}
                    onChange={(e) => onUpdateCategoryColor(cat.id, e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    title="Upravit barvu akcentu kategorie"
                  />
                </div>

                <span className="text-xs font-bold text-white truncate">
                  {cat.title}
                </span>

                <span className="text-[9.5pt] font-mono text-gray-400 px-1.5 py-0.2 rounded bg-white/5 border border-white/5">
                  {cat.shortcuts.length}
                </span>
              </div>

              {onDeleteCategory && cat.id !== 'favorites' && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Opravdu smazat kategorii "${cat.title}"?`)) {
                      onDeleteCategory(cat.id);
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-red-400 rounded hover:bg-white/10"
                  title="Smazat tuto sekci"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Shortcuts Content - Directly visible */}
            <div className="p-2.5 bg-[#16161A] space-y-1.5">
              {cat.shortcuts.length === 0 ? (
                <div className="text-[11px] text-gray-500 italic p-2 text-center">
                  Žádné zkratky v této kategorii
                </div>
              ) : (
                cat.shortcuts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[#22222B] hover:bg-[#2A2A35] text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item.id)}
                        className="text-gray-500 hover:text-amber-400 shrink-0"
                        title={item.isFavorite ? 'Odebrat z Oblíbených' : 'Přidat mezi Oblíbené'}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <span className="text-gray-200 truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {item.keys.map((k, i) => (
                        <kbd key={i} className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#16161A] border border-white/20 text-gray-300 rounded">
                          {k}
                        </kbd>
                      ))}
                      <button
                        type="button"
                        onClick={() => onRemoveShortcut(item.id)}
                        className="p-0.5 text-gray-500 hover:text-red-400 ml-1"
                        title="Smazat zkratku"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Add Shortcut Form to this category */}
              <div className="pt-2 border-t border-white/5 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="Název nové zkratky..."
                    className="flex-1 bg-[#22222B] text-[11px] text-white px-2 py-1 rounded border border-white/10 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={customKeysText}
                    onChange={(e) => setCustomKeysText(e.target.value)}
                    placeholder="Klávesy (⌘+⇧+N)"
                    className="w-28 bg-[#22222B] text-[11px] text-white px-2 py-1 rounded border border-white/10 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuickAddSingleShortcut(cat.id)}
                    className="p-1 bg-amber-500 text-black font-bold rounded hover:bg-amber-400"
                    title="Přidat zkratku"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 bg-[#1A1A22] border-t border-white/10 text-[10px] text-gray-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-amber-400" /> Všechna data se ukládají v prohlížeči
        </span>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md"
        >
          Zavřít
        </button>
      </div>
    </div>
  );
};
