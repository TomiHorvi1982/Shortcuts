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
  Star,
  X,
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon
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
  onOpenCatalogModal: () => void;
  isKeyTesterActive: boolean;
  setIsKeyTesterActive: React.Dispatch<React.SetStateAction<boolean>>;
  isVirtualKeyboardOpen: boolean;
  setIsVirtualKeyboardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPrintPreview: boolean;
  setIsPrintPreview: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: 'web' | 'tablet' | 'phone';
  setViewMode: (mode: 'web' | 'tablet' | 'phone') => void;
  theme: 'night' | 'day';
  setTheme: (theme: 'night' | 'day') => void;
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
  onOpenCatalogModal,
  isKeyTesterActive,
  setIsKeyTesterActive,
  isVirtualKeyboardOpen,
  setIsVirtualKeyboardOpen,
  isPrintPreview,
  setIsPrintPreview,
  viewMode,
  setViewMode,
  theme,
  setTheme
}) => {
  const isDay = theme === 'day';

  return (
    <header className={`no-print border-b sticky top-0 z-40 px-4 py-3 backdrop-blur-md transition-colors duration-300 ${
      isDay ? 'bg-white/90 border-slate-200 text-slate-900 shadow-sm' : 'bg-[#18181F]/90 border-white/10 text-white'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5">
              <div className={`w-full h-full rounded-[6px] flex items-center justify-center font-bold text-sm ${
                isDay ? 'bg-slate-900 text-white' : 'bg-[#16161A] text-white'
              }`}>
                
              </div>
            </div>
            <h1 className={`text-sm font-extrabold tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
              macOS & Studio Apps
            </h1>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDay ? 'text-slate-400' : 'text-gray-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat zkratku (např. Spotlight, R, ⌘+T)..."
              className={`w-full text-sm pl-9 pr-8 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                isDay
                  ? 'bg-slate-100 text-slate-900 border-slate-300 placeholder-slate-400 focus:border-blue-600'
                  : 'bg-[#25252D] text-white border-white/10 placeholder-gray-500 focus:border-blue-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${isDay ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-white'}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* View Mode & Day/Night Theme & Action Buttons */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          {/* Day / Night Theme Toggle */}
          <div className={`flex items-center p-0.5 rounded-lg border text-xs font-semibold ${
            isDay ? 'bg-slate-100 border-slate-300' : 'bg-[#25252D] border-white/10'
          }`}>
            <button
              onClick={() => setTheme('day')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                isDay ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
              title="Denní režim (Světlé téma)"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Den</span>
            </button>
            <button
              onClick={() => setTheme('night')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                !isDay ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Noční režim (Tmavé téma)"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Noc</span>
            </button>
          </div>

          {/* View Mode Switcher (Web / Tablet / Phone) */}
          <div className={`flex items-center p-0.5 rounded-lg border text-xs font-semibold ${
            isDay ? 'bg-slate-100 border-slate-300' : 'bg-[#25252D] border-white/10'
          }`}>
            <button
              onClick={() => setViewMode('web')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                viewMode === 'web'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white'
              }`}
              title="Web (Počítačové zobrazení)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Web</span>
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                viewMode === 'tablet'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white'
              }`}
              title="Tablet zobrazení"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              onClick={() => setViewMode('phone')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                viewMode === 'phone'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white'
              }`}
              title="Mobilní zobrazení (Telefon)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobil</span>
            </button>
          </div>

          {/* Catalog & Favorites Modal Button */}
          <button
            onClick={onOpenCatalogModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500/30 to-purple-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400 transition-all shadow-md"
            title="Otevřít kompletní knihovnu zkratek a správce hvězdiček ⭐"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="hidden lg:inline">Knihovna</span>
          </button>

          {/* Virtual Keyboard Toggle Button */}
          <button
            onClick={() => setIsVirtualKeyboardOpen(!isVirtualKeyboardOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isVirtualKeyboardOpen
                ? 'bg-gradient-to-r from-amber-500/30 to-blue-500/30 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : isDay ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200' : 'bg-[#25252D] text-gray-300 border-white/10 hover:bg-white/10'
            }`}
            title="Zobrazit/skrýt interaktivní virtuální macOS klávesnici"
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-medium">Klávesnice</span>
          </button>

          {/* Add Shortcut Builder Button */}
          <button
            onClick={onOpenBuilderModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-sm"
            title="Vytvořit vlastní klávesovou zkratku"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Zkratka</span>
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

      {/* Sub-toolbar with Zoom controls */}
      <div className={`max-w-7xl mx-auto flex items-center justify-between gap-4 mt-2 pt-2 border-t text-xs ${
        isDay ? 'border-slate-200 text-slate-600' : 'border-white/5 text-gray-400'
      }`}>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-[11px] opacity-80">Režim zobrazení:</span>
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold uppercase text-[9.5pt]">
            {viewMode === 'web' ? '💻 Web (Desktop)' : viewMode === 'tablet' ? '📱 Tablet Preview' : '📱 Mobil Preview'}
          </span>
          <span className="hidden sm:inline text-[11px] opacity-60">• Téma: {isDay ? '☀️ Den (Světlé)' : '🌙 Noc (Tmavé)'}</span>
        </div>

        {/* Zoom Controls */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shrink-0 ${
          isDay ? 'bg-slate-100 border-slate-300' : 'bg-[#25252D] border-white/10'
        }`}>
          <span className="text-[11px] font-medium mr-1 opacity-80">Zoom A4:</span>
          <button
            onClick={() => setScale((s) => Math.max(0.5, Math.round((s - 0.1) * 10) / 10))}
            className={`p-1 rounded transition-colors ${isDay ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-gray-300'}`}
            title="Oddálit dokument A4"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-blue-500 w-10 text-center font-bold">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(1.5, Math.round((s + 0.1) * 10) / 10))}
            className={`p-1 rounded transition-colors ${isDay ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-gray-300'}`}
            title="Přiblížit dokument A4"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <div className={`w-px h-3.5 mx-0.5 ${isDay ? 'bg-slate-300' : 'bg-white/20'}`} />
          <button
            onClick={() => setScale(1.0)}
            className={`p-1 rounded transition-colors ${isDay ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-gray-300'}`}
            title="Obnovit výchozí velikost (100%)"
          >
            <Maximize2 className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </header>
  );
};

