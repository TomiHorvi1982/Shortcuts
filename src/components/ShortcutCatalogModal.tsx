import React, { useState } from 'react';
import { X, Search, Star, Plus, Check, Music, Laptop, Terminal, FileText, LayoutGrid, Sparkles, Filter, Trash2 } from 'lucide-react';
import { ShortcutCategory, ShortcutItem } from '../types';

interface ShortcutCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ShortcutCategory[];
  onToggleFavorite: (shortcutId: string) => void;
  onAddShortcut: (categoryId: string, shortcut: ShortcutItem) => void;
  onRemoveShortcut?: (shortcutId: string) => void;
}

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  favorites: <Sparkles className="w-4 h-4" />,
  logic_general: <Music className="w-4 h-4" />,
  logic_midi_tools: <Terminal className="w-4 h-4" />,
  logic_tracks_mixer: <LayoutGrid className="w-4 h-4" />,
  logic_export_nav: <Laptop className="w-4 h-4" />,
  system: <Laptop className="w-4 h-4 text-blue-400" />,
  terminal: <Terminal className="w-4 h-4 text-green-400" />,
  text: <FileText className="w-4 h-4 text-amber-400" />,
  windows: <LayoutGrid className="w-4 h-4 text-purple-400" />
};

export const ShortcutCatalogModal: React.FC<ShortcutCatalogModalProps> = ({
  isOpen,
  onClose,
  categories,
  onToggleFavorite,
  onAddShortcut,
  onRemoveShortcut
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string | null>(null);

  if (!isOpen) return null;

  // Flatten all shortcuts across categories
  const allCategoryShortcuts: { category: ShortcutCategory; item: ShortcutItem }[] = [];

  categories.forEach((cat) => {
    cat.shortcuts.forEach((item) => {
      allCategoryShortcuts.push({ category: cat, item });
    });
  });

  const filteredShortcuts = allCategoryShortcuts.filter(({ category, item }) => {
    if (selectedCatFilter && category.id !== selectedCatFilter) return false;
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase().trim();
    const labelMatch = item.label.toLowerCase().includes(term);
    const catMatch = category.title.toLowerCase().includes(term);
    const keysMatch = item.keys.some((k) => k.toLowerCase().includes(term));
    return labelMatch || catMatch || keysMatch;
  });

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#1E1E24] border border-white/10 rounded-2xl w-full max-w-4xl flex flex-col shadow-2xl overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#16161A]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Knihovna zkratek & Správce Oblíbených
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  ⭐ Starred Shortcuts
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Kliknutím na hvězdičku ⭐ přidejte zkratku mezi Nejpoužívanější na cheat sheetu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-white/10 bg-[#25252D] flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Vyhledat v knihovně..."
              className="w-full bg-[#16161A] text-xs text-white pl-9 pr-8 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 transition-colors placeholder-gray-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            <button
              onClick={() => setSelectedCatFilter(null)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedCatFilter === null
                  ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-md'
                  : 'bg-[#16161A] text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Vše ({allCategoryShortcuts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatFilter(selectedCatFilter === cat.id ? null : cat.id)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCatFilter === cat.id
                    ? 'text-white border-2 shadow-lg'
                    : 'bg-[#16161A] text-gray-400 border-white/10 hover:text-white'
                }`}
                style={{
                  borderColor: selectedCatFilter === cat.id ? cat.accentColor : undefined,
                  backgroundColor: selectedCatFilter === cat.id ? `${cat.accentColor}25` : undefined
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.accentColor }}
                />
                <span>{cat.title}</span>
                <span className="text-[10px] font-mono text-gray-400 font-normal">
                  ({cat.shortcuts.length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Shortcuts List Grid */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 max-h-[60vh]">
          {filteredShortcuts.length === 0 ? (
            <div className="py-12 text-center text-gray-400 flex flex-col items-center justify-center gap-2">
              <Search className="w-8 h-8 text-gray-600 mb-1" />
              <p className="text-sm font-semibold">Žádné zkratky neodpovídají zadanému filtru</p>
              <p className="text-xs text-gray-500">Zkuste změnit klíčové slovo nebo vynulovat kategórii</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredShortcuts.map(({ category, item }) => {
                const isFav = item.isFavorite;

                return (
                  <div
                    key={`${category.id}-${item.id}`}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isFav
                        ? 'bg-gradient-to-r from-amber-500/10 to-[#25252D] border-amber-500/40 shadow-md'
                        : 'bg-[#16161A] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Star Favorite Toggle Button */}
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item.id)}
                        className={`p-1.5 rounded-lg transition-transform active:scale-95 shrink-0 ${
                          isFav
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-white/5 text-gray-500 hover:text-amber-300'
                        }`}
                        title={isFav ? 'Odebrat z Oblíbených' : 'Přidat mezi ⭐ Nejpoužívanější'}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs text-white font-medium truncate">
                            {item.label}
                          </span>
                          <span
                            className="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold"
                            style={{
                              backgroundColor: `${category.accentColor}22`,
                              color: category.accentColor
                            }}
                          >
                            {category.title}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Keys Badge Display */}
                    <div className="flex items-center gap-1 shrink-0">
                      {item.keys.map((k, idx) => (
                        <kbd key={idx} className="mac-kbd text-xs">
                          {k}
                        </kbd>
                      ))}

                      {onRemoveShortcut && item.id.startsWith('custom-') && (
                        <button
                          type="button"
                          onClick={() => onRemoveShortcut(item.id)}
                          className="p-1 text-gray-500 hover:text-red-400 rounded hover:bg-white/5 ml-1"
                          title="Smazat zkratku"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#16161A] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Zkratky označené ⭐ se automaticky zobrazí v sekci Nejpoužívanější.</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Hotovo
          </button>
        </div>
      </div>
    </div>
  );
};
