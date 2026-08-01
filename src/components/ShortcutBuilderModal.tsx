import React, { useState, useEffect } from 'react';
import { X, Keyboard, Plus, Trash2, Sparkles, Check, RotateCcw } from 'lucide-react';
import { ShortcutCategory, ShortcutItem } from '../types';

interface ShortcutBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ShortcutCategory[];
  onAddShortcut: (categoryId: string, shortcut: ShortcutItem) => void;
}

const COMMON_KEYS = [
  '⌘', '⌥', '⇧', '⌃',
  'Mezerník', 'Esc', 'Enter', 'Tab',
  '←', '→', '↑', '↓',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '~', ',', '.', '/', 'F1', 'F2', 'F3', 'F4', 'F5', 'F11', 'F12'
];

export const ShortcutBuilderModal: React.FC<ShortcutBuilderModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddShortcut
}) => {
  const [label, setLabel] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'system');
  const [keys, setKeys] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(true);
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !isRecording) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid capturing when typing in the label text input
      const activeElement = document.activeElement;
      if (activeElement && activeElement.tagName === 'INPUT') {
        return;
      }

      e.preventDefault();
      const newKeys: string[] = [];

      // Detect modifiers
      if (e.metaKey) newKeys.push('⌘');
      if (e.altKey) newKeys.push('⌥');
      if (e.shiftKey) newKeys.push('⇧');
      if (e.ctrlKey) newKeys.push('⌃');

      let mainKey = e.key;
      if (mainKey === ' ') mainKey = 'Mezerník';
      else if (mainKey === 'Escape') mainKey = 'Esc';
      else if (mainKey === 'ArrowLeft') mainKey = '←';
      else if (mainKey === 'ArrowRight') mainKey = '→';
      else if (mainKey === 'ArrowUp') mainKey = '↑';
      else if (mainKey === 'ArrowDown') mainKey = '↓';
      else if (mainKey.length === 1) mainKey = mainKey.toUpperCase();

      if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key) && mainKey) {
        newKeys.push(mainKey);
      }

      if (newKeys.length > 0) {
        setKeys(newKeys);
        setLastKeyPressed(newKeys.join(' + '));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isRecording]);

  if (!isOpen) return null;

  const handleKeyClick = (keySymbol: string) => {
    // If clicking a modifier key and already have it, don't duplicate, otherwise append
    setKeys((prev) => {
      if (prev.includes(keySymbol)) return prev;
      return [...prev, keySymbol];
    });
    setLastKeyPressed(keySymbol);
  };

  const handleRemoveKey = (index: number) => {
    setKeys((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearKeys = () => {
    setKeys([]);
    setLastKeyPressed(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    if (keys.length === 0) return;

    const newShortcut: ShortcutItem = {
      id: `custom-${Date.now()}`,
      label: label.trim(),
      keys: keys,
      tags: ['vlastni']
    };

    onAddShortcut(categoryId, newShortcut);

    // Reset form
    setLabel('');
    setKeys([]);
    setLastKeyPressed(null);
    onClose();
  };

  const selectedCategory = categories.find((c) => c.id === categoryId) || categories[0];

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#1E1E24] border border-white/10 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#16161A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Nová klávesová zkratka
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  Builder
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Stiskněte klávesy na klávesnici nebo klikněte na tlačítka níže
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Kategorie:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                    categoryId === cat.id
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'bg-[#25252D] text-gray-400 border-white/5 hover:text-gray-200'
                  }`}
                  style={{
                    borderColor: categoryId === cat.id ? cat.accentColor : undefined
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                  <span className="truncate">{cat.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shortcut Name Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Název zkratky / Popis:
            </label>
            <input
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Např. Exportovat audio (MP3), Nové okno relace..."
              className="w-full bg-[#16161A] text-sm text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 transition-colors placeholder-gray-500"
            />
          </div>

          {/* Interactive Keyboard Capture Area */}
          <div className="bg-[#16161A] p-4 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-emerald-400 animate-ping' : 'bg-gray-500'}`} />
                Vytvořená sekvence kláves:
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                    isRecording
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-gray-800 text-gray-400 border-white/10'
                  }`}
                >
                  {isRecording ? 'Živý odchyt stisku: AKTIVNÍ' : 'Živý odchyt: PAUZA'}
                </button>
                {keys.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearKeys}
                    className="text-[11px] text-gray-400 hover:text-red-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5"
                  >
                    <RotateCcw className="w-3 h-3" /> Vymazat
                  </button>
                )}
              </div>
            </div>

            {/* Keys Visualizer */}
            <div className="min-h-[56px] bg-[#25252D] rounded-xl p-3 border border-white/5 flex items-center justify-between gap-3">
              {keys.length === 0 ? (
                <span className="text-xs text-gray-500 italic">
                  Stiskněte klávesy na klávesnici nebo klikněte na tlačítka níže...
                </span>
              ) : (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {keys.map((k, idx) => (
                    <div key={idx} className="relative group">
                      <kbd className="mac-kbd text-sm min-w-[28px] h-[28px] px-2.5">
                        {k}
                      </kbd>
                      <button
                        type="button"
                        onClick={() => handleRemoveKey(idx)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Odstranit tuto klávesu"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {lastKeyPressed && (
                <span className="text-[11px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                  {lastKeyPressed}
                </span>
              )}
            </div>

            {/* Common Keys Quick Picker Grid */}
            <div>
              <span className="block text-[11px] font-medium text-gray-400 mb-2">
                Rychlé tlačítka (kliknutím přidáte symbol):
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar p-1 bg-[#25252D]/50 rounded-lg border border-white/5">
                {COMMON_KEYS.map((k, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleKeyClick(k)}
                    className="mac-kbd hover:mac-kbd-active text-xs cursor-pointer active:scale-95"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-3 bg-[#25252D] rounded-xl border border-white/10">
            <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Náhled v cheat sheetu:
            </span>
            <div className="flex items-center justify-between py-1.5 px-3 bg-[#16161A] rounded-lg border-l-4 border-l-amber-400">
              <span className="text-xs text-white font-medium">
                {label || 'Zde bude název vaší zkratky'}
              </span>
              <div className="flex items-center gap-1">
                {keys.length === 0 ? (
                  <span className="text-xs text-gray-500">[Klávesy]</span>
                ) : (
                  keys.map((k, i) => (
                    <kbd key={i} className="mac-kbd text-xs">
                      {k}
                    </kbd>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Zrušit
            </button>
            <button
              type="submit"
              disabled={!label.trim() || keys.length === 0}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Přidat do cheat sheetu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
