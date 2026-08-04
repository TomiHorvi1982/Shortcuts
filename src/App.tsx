import React, { useState, useEffect } from 'react';
import { SHORTCUT_CATEGORIES } from './data/shortcuts';
import { ShortcutCategory, ShortcutItem } from './types';
import { A4Sheet } from './components/A4Sheet';
import { Toolbar } from './components/Toolbar';
import { CodeModal } from './components/CodeModal';
import { KeyTesterBar } from './components/KeyTesterBar';
import { ShortcutBuilderModal } from './components/ShortcutBuilderModal';
import { ShortcutCatalogModal } from './components/ShortcutCatalogModal';
import { CategorySidebar } from './components/CategorySidebar';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { RotateCcw, Eye, Printer, X, FileCheck, ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'mac_cheatsheet_categories_v3';

export default function App() {
  const [categories, setCategories] = useState<ShortcutCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load shortcuts from localStorage:', e);
    }
    return SHORTCUT_CATEGORIES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [scale, setScale] = useState(1.0);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isBuilderModalOpen, setIsBuilderModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isKeyTesterActive, setIsKeyTesterActive] = useState(false);
  const [viewMode, setViewMode] = useState<'web' | 'tablet' | 'phone'>('web');
  const [theme, setTheme] = useState<'night' | 'day'>('night');

  const handleAddNewCategory = (
    title: string,
    accentColor: string = '#0A84FF',
    initialShortcuts: ShortcutItem[] = []
  ) => {
    const newCatId = `cat_custom_${Date.now()}`;
    const newCategory: ShortcutCategory = {
      id: newCatId,
      title,
      accentColor,
      badgeBg: `${accentColor}20`,
      borderColor: `${accentColor}40`,
      iconName: 'FileText',
      shortcuts: initialShortcuts
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId === 'favorites') return;
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };
  const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState(true);
  const [isPrintPreview, setIsPrintPreview] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // Listen for ESC key to exit print preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPrintPreview) {
        setIsPrintPreview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPrintPreview]);

  // Persist categories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save shortcuts to localStorage:', e);
    }
  }, [categories]);

  const handleAddShortcut = (categoryId: string, shortcut: ShortcutItem) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            shortcuts: [...cat.shortcuts, shortcut]
          };
        }
        return cat;
      })
    );
  };

  const handleToggleFavorite = (shortcutId: string) => {
    setCategories((prevCategories) => {
      // Toggle isFavorite flag in all standard categories
      const updated = prevCategories.map((cat) => {
        if (cat.id === 'favorites') return cat;
        return {
          ...cat,
          shortcuts: cat.shortcuts.map((s) => {
            if (s.id === shortcutId) {
              return { ...s, isFavorite: !s.isFavorite };
            }
            return s;
          })
        };
      });

      // Re-collect all favorite shortcuts across categories
      const favList: ShortcutItem[] = [];
      updated.forEach((cat) => {
        if (cat.id !== 'favorites') {
          cat.shortcuts.forEach((s) => {
            if (s.isFavorite) {
              favList.push({ ...s, categoryName: cat.title });
            }
          });
        }
      });

      // Update favorites category
      return updated.map((cat) => {
        if (cat.id === 'favorites') {
          return { ...cat, shortcuts: favList };
        }
        return cat;
      });
    });
  };

  const handleDeleteShortcut = (shortcutId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => ({
        ...cat,
        shortcuts: cat.shortcuts.filter((s) => s.id !== shortcutId)
      }))
    );
  };

  const handleReorderCategories = (newCategories: ShortcutCategory[]) => {
    setCategories(newCategories);
  };

  const handleUpdateCategoryColor = (categoryId: string, newColor: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            accentColor: newColor,
            borderColor: newColor
          };
        }
        return cat;
      })
    );
  };

  const handleResetToDefault = () => {
    if (window.confirm('Opravdu chcete obnovit všechny zkratky do výchozího stavu?')) {
      setCategories(SHORTCUT_CATEGORIES);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Filter categories based on selection
  const filteredCategories = categories.filter((cat) => {
    if (selectedCategoryId && cat.id !== selectedCategoryId) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const isDay = theme === 'day';

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-500/30 transition-colors duration-300 ${
      isDay ? 'bg-slate-100 text-slate-900 selection:text-slate-900' : 'bg-[#0F0F12] text-[#F2F2F7] selection:text-white'
    }`}>
      {/* Conditionally Render Toolbar or Print Preview Bar */}
      {isPrintPreview ? (
        <header className="no-print bg-[#18181F]/95 backdrop-blur-md border-b border-purple-500/40 sticky top-0 z-50 px-4 py-2.5 shadow-2xl animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <FileCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  Režim Náhledu Tisku (Print Preview)
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                    A4 Portrait • 210 × 297 mm
                  </span>
                </h2>
                <p className="text-[11px] text-gray-400">
                  Zobrazen přesný finální vzhled dokumentu bez ovladačů aplikace. Pro návrat stiskněte Klávesu <kbd className="px-1 py-0.5 bg-white/10 text-white rounded text-[9px] font-mono">Esc</kbd>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Vytisknout / PDF (⌘+P)</span>
              </button>

              <button
                onClick={() => setIsPrintPreview(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25252D] text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                title="Opustit režim náhledu tisku (Esc)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ukončit náhled</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        <>
          {/* Top Toolbar */}
          <Toolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            scale={scale}
            setScale={setScale}
            onPrint={handlePrint}
            onOpenCodeModal={() => setIsCodeModalOpen(true)}
            onOpenBuilderModal={() => setIsBuilderModalOpen(true)}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            isKeyTesterActive={isKeyTesterActive}
            setIsKeyTesterActive={setIsKeyTesterActive}
            isVirtualKeyboardOpen={isVirtualKeyboardOpen}
            setIsVirtualKeyboardOpen={setIsVirtualKeyboardOpen}
            isPrintPreview={isPrintPreview}
            setIsPrintPreview={setIsPrintPreview}
            viewMode={viewMode}
            setViewMode={setViewMode}
            theme={theme}
            setTheme={setTheme}
          />

          {/* Interactive Virtual Keyboard */}
          {isVirtualKeyboardOpen && (
            <VirtualKeyboard
              categories={categories}
              searchQuery={searchQuery}
              onClose={() => setIsVirtualKeyboardOpen(false)}
              onKeyComboChange={(keys) => setActiveKeys(keys)}
              onUpdateCategoryColor={handleUpdateCategoryColor}
              theme={theme}
            />
          )}

          {/* Live Key Tester Bar */}
          {isKeyTesterActive && (
            <KeyTesterBar
              activeKeys={activeKeys}
              setActiveKeys={setActiveKeys}
              onClose={() => setIsKeyTesterActive(false)}
            />
          )}
        </>
      )}

      {/* Main Canvas Viewport */}
      <main className={`flex-1 overflow-auto flex justify-center items-start transition-all duration-300 ${
        isPrintPreview
          ? 'py-12 bg-[#0A0A0E] bg-grid-pattern'
          : isDay ? 'py-8 px-4 bg-slate-100' : 'py-8 px-4 bg-[#0F0F12]'
      }`}>
        {/* Responsive Device Frame Container based on ViewMode */}
        <div className={`w-full transition-all duration-300 ${
          viewMode === 'tablet'
            ? `max-w-[840px] mx-auto p-4 md:p-6 rounded-[36px] border-8 shadow-2xl my-4 relative ${
                isDay ? 'bg-slate-200 border-slate-400 shadow-slate-400/20' : 'bg-[#141419] border-slate-800 shadow-black/80'
              }`
            : viewMode === 'phone'
            ? `max-w-[420px] mx-auto p-3 md:p-4 rounded-[48px] border-[10px] shadow-2xl my-4 relative ${
                isDay ? 'bg-slate-200 border-slate-400 shadow-slate-400/20' : 'bg-[#141419] border-slate-900 shadow-black/90'
              }`
            : 'max-w-full'
        }`}>
          {/* Simulated Tablet / Mobile Bezel Elements */}
          {viewMode === 'tablet' && (
            <div className="w-full flex items-center justify-center mb-3 no-print">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-white/20 shadow-inner" title="Tablet Front Camera" />
            </div>
          )}
          {viewMode === 'phone' && (
            <div className="w-full flex items-center justify-center mb-4 no-print">
              <div className="w-28 h-5 rounded-full bg-black border border-white/10 flex items-center justify-between px-3 shadow-inner" title="Dynamic Island">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900/60 border border-blue-400/30" />
                <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
              </div>
            </div>
          )}

          <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 max-w-full">
            {/* Apps Kategorie Panel - listed directly beside the A4 portrait sheet */}
            {!isPrintPreview && (
              <CategorySidebar
                isOpen={true}
                onClose={() => {}}
                categories={categories}
                onUpdateCategoryColor={handleUpdateCategoryColor}
                onToggleFavorite={handleToggleFavorite}
                onAddShortcut={handleAddShortcut}
                onRemoveShortcut={handleDeleteShortcut}
                onAddNewCategory={handleAddNewCategory}
                onDeleteCategory={handleDeleteCategory}
                theme={theme}
              />
            )}

            {/* Core A4 Sheet Container */}
            <div className="flex flex-col items-center max-w-full overflow-x-auto w-full">
              {/* Helper hint banner - hidden in print preview */}
              {!isPrintPreview && (
                <div className={`no-print mb-4 flex items-center justify-between gap-4 w-full max-w-[210mm] px-2 text-xs ${
                  isDay ? 'text-slate-600' : 'text-gray-400'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    A4 Portrait • Drag & Drop řazení
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleResetToDefault}
                      className="hover:text-amber-500 transition-colors flex items-center gap-1 text-[11px] font-medium"
                      title="Obnovit výchozí zkratky"
                    >
                      <RotateCcw className="w-3 h-3" /> Obnovit
                    </button>
                    <span>PDF Tisk (⌘+P)</span>
                  </div>
                </div>
              )}

              {/* Core A4 Sheet Component */}
              <div className={`transition-all duration-300 max-w-full ${
                isPrintPreview ? 'shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/20 rounded-lg ring-1 ring-white/10' : ''
              }`}>
                <A4Sheet
                  categories={filteredCategories}
                  searchQuery={searchQuery}
                  activePressedKeys={activeKeys}
                  scale={scale}
                  onDeleteShortcut={handleDeleteShortcut}
                  onReorderCategories={handleReorderCategories}
                  onUpdateCategoryColor={handleUpdateCategoryColor}
                  onToggleFavorite={handleToggleFavorite}
                  isPrintPreview={isPrintPreview}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Standalone Code Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        categories={categories}
      />

      {/* Interactive Shortcut Builder Modal */}
      <ShortcutBuilderModal
        isOpen={isBuilderModalOpen}
        onClose={() => setIsBuilderModalOpen(false)}
        categories={categories}
        onAddShortcut={handleAddShortcut}
      />

      {/* Comprehensive Catalog & Favorites Star Manager Modal */}
      <ShortcutCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        categories={categories}
        onToggleFavorite={handleToggleFavorite}
        onAddShortcut={handleAddShortcut}
        onRemoveShortcut={handleDeleteShortcut}
      />
    </div>
  );
}
