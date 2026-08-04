import React, { useState } from 'react';
import { ShortcutCategory } from '../types';
import { Laptop, Terminal, Music, FileText, LayoutGrid, Check, Copy, Trash2, GripVertical, Palette, Star, Sparkles } from 'lucide-react';

interface A4SheetProps {
  categories: ShortcutCategory[];
  searchQuery: string;
  activePressedKeys?: string[];
  scale?: number;
  onDeleteShortcut?: (shortcutId: string) => void;
  onReorderCategories?: (newCategories: ShortcutCategory[]) => void;
  onUpdateCategoryColor?: (categoryId: string, newColor: string) => void;
  onToggleFavorite?: (shortcutId: string) => void;
  isPrintPreview?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Laptop: <Laptop className="w-3.5 h-3.5" />,
  Terminal: <Terminal className="w-3.5 h-3.5" />,
  Music: <Music className="w-3.5 h-3.5" />,
  FileText: <FileText className="w-3.5 h-3.5" />,
  LayoutGrid: <LayoutGrid className="w-3.5 h-3.5" />
};

export const A4Sheet: React.FC<A4SheetProps> = ({
  categories,
  searchQuery,
  activePressedKeys = [],
  scale = 1.0,
  onDeleteShortcut,
  onReorderCategories,
  onUpdateCategoryColor,
  onToggleFavorite,
  isPrintPreview = false
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [draggedIdx, setDraggedIdx] = React.useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = React.useState<number | null>(null);

  const handleCopyShortcut = (keys: string[], label: string, id: string) => {
    const text = `${label}: ${keys.join(' + ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const isKeyActive = (key: string) => {
    if (!activePressedKeys.length) return false;
    const cleanKey = key.trim().toLowerCase();
    return activePressedKeys.some(
      (pk) => pk.toLowerCase() === cleanKey || (pk === 'Meta' && key === '⌘') || (pk === 'Alt' && key === '⌥') || (pk === 'Shift' && key === '⇧') || (pk === 'Control' && key === '⌃')
    );
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIdx(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== targetIndex && onReorderCategories) {
      const updated = [...categories];
      const [movedItem] = updated.splice(draggedIdx, 1);
      updated.splice(targetIndex, 0, movedItem);
      onReorderCategories(updated);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div
      className="print-only-page bg-[#16161A] text-[#F2F2F7] relative mx-auto flex flex-col justify-between overflow-hidden shadow-2xl transition-transform duration-200"
      style={{
        width: '210mm',
        height: '297mm',
        padding: '10mm 12mm',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      {/* Header */}
      <header className="border-b border-white/10 pb-2 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none text-white font-semibold"></span>
          <h1 className="text-[16pt] font-extrabold tracking-tight text-white leading-tight">
            macOS & Studio Apps Reference Sheet
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-[#25252D] px-3 py-1 rounded-full border border-white/5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          <span className="text-[8pt] uppercase tracking-widest ml-1 text-gray-400 font-mono">
            Bento Grid
          </span>
        </div>
      </header>

      {/* Visual Category Color Legend Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2 mb-2.5 border-b border-white/5 text-[8.5pt]">
        <span className="text-[7.5pt] uppercase font-mono tracking-wider text-gray-400 font-bold mr-1 flex items-center gap-1">
          <Palette className="w-3 h-3 text-amber-400" /> Legenda Kategorií:
        </span>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#25252D] border border-white/10 shadow-sm group transition-all"
          >
            <div className="relative flex items-center justify-center">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shadow-sm transition-transform group-hover:scale-125"
                style={{ backgroundColor: cat.accentColor }}
              />
              {onUpdateCategoryColor && !isPrintPreview && (
                <input
                  type="color"
                  value={cat.accentColor}
                  onChange={(e) => onUpdateCategoryColor(cat.id, e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  title={`Změnit barvu kategorie ${cat.title}`}
                />
              )}
            </div>
            <span className="font-semibold text-gray-200">{cat.title}</span>
            <span
              className="text-[7.5pt] px-1.5 py-0.2 rounded-full font-mono font-bold"
              style={{ backgroundColor: `${cat.accentColor}33`, color: cat.accentColor }}
            >
              {cat.shortcuts.length}
            </span>
          </div>
        ))}
      </div>

      {/* Grid Layout (3 Columns Bento) */}
      <main className="grid grid-cols-3 gap-[4.5mm] flex-1">
        {categories.map((cat, idx) => {
          const isCategoryMatch = searchQuery
            ? cat.shortcuts.some(
                (s) =>
                  s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.keys.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
              )
            : true;

          if (searchQuery && !isCategoryMatch) return null;

          const isLogic = cat.id === 'logic';
          const isDragging = draggedIdx === idx;
          const isOver = dragOverIdx === idx;

          return (
            <div
              key={cat.id}
              draggable={!searchQuery && !isPrintPreview}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`bg-[#25252D]/80 backdrop-blur-md rounded-2xl p-[3.5mm_4mm] flex flex-col justify-between shadow-lg border transition-all duration-150 relative overflow-hidden group/card ${
                isLogic ? 'col-span-1 border-l-4 border-l-[#FFD60A]' : ''
              } ${
                isDragging ? 'opacity-30 scale-95 border-amber-500 border-dashed' : 'border-white/10'
              } ${
                isOver ? 'ring-2 ring-amber-400 border-amber-400 scale-[1.02] shadow-2xl bg-[#2D2D38]' : ''
              }`}
              style={{
                borderLeftColor: cat.accentColor,
                borderLeftWidth: '4px'
              }}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    {!searchQuery && !isPrintPreview && (
                      <GripVertical
                        className="w-3.5 h-3.5 no-print text-gray-500 group-hover/card:text-gray-300 cursor-grab active:cursor-grabbing shrink-0 transition-colors"
                        title="Přetáhněte pro změnu pořadí kategorií"
                      />
                    )}
                    <span
                      className="text-xs font-bold"
                      style={{ color: cat.accentColor }}
                    >
                      ●
                    </span>
                    <div
                      className="p-1 rounded bg-white/5"
                      style={{ color: cat.accentColor }}
                    >
                      {ICON_MAP[cat.iconName] || <Laptop className="w-3.5 h-3.5" />}
                    </div>
                    <h2
                      className="text-[9.5pt] font-bold tracking-wider uppercase"
                      style={{ color: cat.accentColor }}
                    >
                      {cat.title}
                    </h2>
                  </div>
                  <span className="text-[7pt] px-1.5 py-0.5 rounded-full font-mono bg-white/5 text-gray-400">
                    {cat.shortcuts.length}
                  </span>
                </div>

                {/* Shortcuts List */}
                <div className="flex flex-col gap-[1.8mm]">
                  {cat.shortcuts.map((item) => {
                    const isMatch = searchQuery
                      ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.keys.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
                      : true;

                    if (searchQuery && !isMatch) return null;

                    const isCustom = item.id.startsWith('custom-') || item.tags?.includes('vlastni');

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleCopyShortcut(item.keys, item.label, item.id)}
                        className={`group flex items-center justify-between gap-1.5 py-1 rounded px-1 transition-colors cursor-pointer border-b border-white/[0.03] hover:bg-white/5 ${
                          copiedId === item.id ? 'bg-emerald-500/10' : ''
                        }`}
                        title="Kliknutím zkopírujete zkratku"
                      >
                        <span className="text-[8.2pt] text-white/85 font-medium leading-tight flex-1 group-hover:text-white flex items-center gap-1">
                          {onToggleFavorite && !isPrintPreview && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(item.id);
                              }}
                              className={`no-print p-0.5 rounded hover:bg-white/10 transition-colors ${
                                item.isFavorite ? 'text-amber-400' : 'text-gray-600 opacity-0 group-hover:opacity-100'
                              }`}
                              title={item.isFavorite ? 'Odebrat z Oblíbených' : 'Přidat mezi ⭐ Nejpoužívanější'}
                            >
                              <Star className={`w-2.5 h-2.5 ${item.isFavorite ? 'fill-amber-400' : ''}`} />
                            </button>
                          )}
                          {item.label}
                          {isCustom && (
                            <span className="text-[6.5pt] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                              Vlastní
                            </span>
                          )}
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                          {item.keys.map((k, idx) => {
                            if (k === '/' || k === 'nebo') {
                              return (
                                <span key={idx} className="text-[7.5pt] text-[#8E8E93] px-0.5">
                                  {k}
                                </span>
                              );
                            }

                            const active = isKeyActive(k);

                            return (
                              <kbd
                                key={idx}
                                className={`mac-kbd ${active ? 'mac-kbd-active' : ''}`}
                              >
                                {k}
                              </kbd>
                            );
                          })}

                          {isCustom && onDeleteShortcut && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteShortcut(item.id);
                              }}
                              className="no-print p-0.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5"
                              title="Smazat tuto zkratku"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          )}

                          {copiedId === item.id ? (
                            <Check className="w-3 h-3 text-emerald-400 ml-0.5" />
                          ) : (
                            !isCustom && (
                              <Copy className="w-2.5 h-2.5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" />
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Logic Pro centerpiece Pro Tip banner */}
              {isLogic && (
                <div className="mt-3 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2.5 bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <div className="w-7 h-7 rounded bg-[#FFD60A] flex items-center justify-center text-black font-extrabold text-xs shrink-0">
                      LP
                    </div>
                    <div>
                      <p className="text-[8pt] font-bold text-[#FFD60A] uppercase tracking-wider">PRO TIP</p>
                      <p className="text-[7.5pt] text-gray-400 leading-tight">
                        Klávesa <kbd className="mac-kbd text-[7pt] min-w-[14px] h-[14px] px-1">?</kbd> otevře Quick Help okno pro nástroj pod kurzorem.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-2 mt-2 flex items-center justify-between text-[7.5pt] text-[#8E8E93]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono bg-white/5 px-1.5 py-0.5 rounded">
            <kbd className="mac-kbd text-[7pt] min-w-[14px] h-[14px] px-1">⌘</kbd> Command
          </span>
          <span className="flex items-center gap-1 font-mono bg-white/5 px-1.5 py-0.5 rounded">
            <kbd className="mac-kbd text-[7pt] min-w-[14px] h-[14px] px-1">⌥</kbd> Option
          </span>
          <span className="flex items-center gap-1 font-mono bg-white/5 px-1.5 py-0.5 rounded">
            <kbd className="mac-kbd text-[7pt] min-w-[14px] h-[14px] px-1">⇧</kbd> Shift
          </span>
          <span className="flex items-center gap-1 font-mono bg-white/5 px-1.5 py-0.5 rounded">
            <kbd className="mac-kbd text-[7pt] min-w-[14px] h-[14px] px-1">⌃</kbd> Control
          </span>
        </div>
        <div className="text-right font-medium text-gray-400">
          Formát A4 Portrait • Připraveno pro tisk
        </div>
      </footer>
    </div>
  );
};
