import React from 'react';
import {
  Printer,
  Code,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Keyboard,
  Plus,
  Sparkles,
  Eye,
  X
} from 'lucide-react';
import { SHORTCUT_CATEGORIES } from '../data/shortcuts';

interface ToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (catId: string | null) => void;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  onPrint: () => void;
  onOpenCodeModal: () => void;
  onOpenBuilderModal: () => void;
  isKeyTesterActive: boolean;
  setIsKeyTesterActive: React.Dispatch<React.SetStateAction<boolean>>;
  isVirtualKeyboardOpen: boolean;
  setIsVirtualKeyboardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPrintPreview: boolean;
  setIsPrintPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategoryId,
  setSelectedCategoryId,
  scale,
  setScale,
  onPrint,
  onOpenCodeModal,
  onOpenBuilderModal,
  isKeyTesterActive,
  setIsKeyTesterActive,
  isVirtualKeyboardOpen,
  setIsVirtualKeyboardOpen,
  isPrintPreview,
  setIsPrintPreview
}) => {
  return (
    <header className="no-print bg-[#18181F]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title / Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/10">
            <div className="w-full h-full bg-[#16161A] rounded-[10px] flex items-center justify-center text-white font-bold text-lg">
              
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight flex items-center gap-2">
              macOS & Logic Pro
              <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
                A4 Cheat Sheet
              </span>
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              Rychlý přehled klávesových zkratek pro efektivnější práci
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat zkratku (např. Spotlight, R, ⌘+T)..."
              className="w-full bg-[#25252D] text-sm text-white pl-9 pr-8 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Virtual Keyboard Toggle Button */}
          <button
            onClick={() => setIsVirtualKeyboardOpen(!isVirtualKeyboardOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isVirtualKeyboardOpen
                ? 'bg-gradient-to-r from-amber-500/30 to-blue-500/30 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-[#25252D] text-gray-300 border-white/10 hover:bg-white/10'
            }`}
            title="Zobrazit/skrýt interaktivní virtuální macOS klávesnici"
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-medium">Virtuální Klávesnice</span>
          </button>

          {/* Add Shortcut Builder Button */}
          <button
            onClick={onOpenBuilderModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-sm"
            title="Vytvořit vlastní klávesovou zkratku pomocí klávesnice"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Nová zkratka</span>
          </button>

          {/* Key tester toggle */}
          <button
            onClick={() => setIsKeyTesterActive(!isKeyTesterActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isKeyTesterActive
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/10'
                : 'bg-[#25252D] text-gray-300 border-white/10 hover:bg-white/10'
            }`}
            title="Aktivuje simulátor živých stisků klávesnice"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">Klávesový Test</span>
          </button>

          {/* HTML Code View */}
          <button
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25252D] text-gray-200 border border-white/10 hover:bg-white/10 transition-colors"
            title="Zobrazit a zkopírovat čistý HTML/CSS kód"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>HTML Kód</span>
          </button>

          {/* Print Preview Toggle */}
          <button
            onClick={() => setIsPrintPreview(!isPrintPreview)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isPrintPreview
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-lg shadow-purple-500/10'
                : 'bg-[#25252D] text-gray-300 border-white/10 hover:bg-white/10'
            }`}
            title="Simulovat presný vzhled A4 tisku bez ovladačů aplikace"
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline font-medium">Náhled Tisku</span>
          </button>

          {/* Print / PDF Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95"
            title="Vytisknout nebo uložit jako A4 PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Tisk / PDF</span>
          </button>
        </div>
      </div>

      {/* Sub-toolbar with Category pills & Zoom controls */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 mt-2.5 pt-2 border-t border-white/5 text-xs">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategoryId === null
                ? 'bg-blue-600 text-white'
                : 'bg-[#25252D] text-gray-400 hover:text-white'
            }`}
          >
            Všechny kategórie
          </button>
          {SHORTCUT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(isSelected ? null : cat.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'text-white shadow-sm'
                    : 'bg-[#25252D] text-gray-400 border-transparent hover:text-white'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.accentColor : undefined,
                  borderColor: isSelected ? cat.accentColor : undefined
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.accentColor }}
                />
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#25252D] px-2 py-1 rounded-lg border border-white/10 shrink-0">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white"
            title="Oddálit"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-gray-300 w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
            className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white"
            title="Přiblížit"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-3 bg-white/20 mx-0.5" />
          <button
            onClick={() => setScale(1.0)}
            className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white"
            title="Obnovit výchozí velikost (100%)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
