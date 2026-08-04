import React, { useEffect, useState } from 'react';
import { Keyboard, X, Sparkles, Check, Info, Search, Palette, Paintbrush, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { ShortcutCategory, ShortcutItem } from '../types';

interface DAWKeyInfo {
  action: string;
  icon?: string;
  bgColor: string;
  textColor?: string;
  category: 'tools' | 'tracks' | 'transport' | 'windows';
  badge?: string;
}

const LOGIC_DAW_KEYMAP: Record<string, DAWKeyInfo> = {
  'ESC': { action: 'ZRUŠIT / NÁSTROJ', icon: '🚫', bgColor: '#8E8E93', category: 'tools' },
  'F1': { action: 'NÁPOVĚDA', icon: '❓', bgColor: '#0A84FF', category: 'windows' },
  'F2': { action: 'MARKERY', icon: '🔖', bgColor: '#FF9500', category: 'windows' },

  '1': { action: 'HLAVNÍ OKNO', icon: '🖥️', bgColor: '#FF9500', category: 'windows' },
  '2': { action: 'SADA 2', icon: '📐', bgColor: '#FF9500', category: 'windows' },
  '3': { action: 'SADA 3', icon: '📐', bgColor: '#FF9500', category: 'windows' },
  '4': { action: 'PIANO ROLL', icon: '🎹', bgColor: '#FF9500', category: 'windows' },
  '5': { action: 'NOTACE', icon: '🎼', bgColor: '#FF9500', category: 'windows' },
  '6': { action: 'AUDIO EDITOR', icon: '🎙️', bgColor: '#FF9500', category: 'windows' },
  '7': { action: 'EVENT LIST', icon: '📋', bgColor: '#FF9500', category: 'windows' },
  '8': { action: 'PROJ AUDIO', icon: '🎵', bgColor: '#FF9500', category: 'windows' },
  '9': { action: 'TRANSFORM', icon: '🔄', bgColor: '#FF9500', category: 'windows' },
  '0': { action: 'ENVIRONMENT', icon: '⚙️', bgColor: '#BF5AF2', category: 'windows' },
  '-': { action: 'ODDÁLIT (ZOOM-)', icon: '🔍-', bgColor: '#0A84FF', category: 'tools' },
  '=': { action: 'PŘIBLÍŽIT (ZOOM+)', icon: '🔍+', bgColor: '#0A84FF', category: 'tools' },

  'Q': { action: 'QUANTIZE', icon: '⏱️', bgColor: '#FFD60A', textColor: '#000', category: 'tracks', badge: 'QUANT' },
  'W': { action: 'AUDIO FILE', icon: '🎙️', bgColor: '#FF9500', category: 'windows' },
  'E': { action: 'EDITORY', icon: '✏️', bgColor: '#FF9500', category: 'windows' },
  'R': { action: 'RECORD ENABLE', icon: '🔴', bgColor: '#FF3B30', textColor: '#fff', category: 'tracks', badge: 'REC' },
  'T': { action: 'PALETA NÁSTROJŮ', icon: '🧰', bgColor: '#0A84FF', category: 'tools', badge: 'TOOL' },
  'Y': { action: 'KNAPHOVNA (LIB)', icon: '📚', bgColor: '#FF9500', category: 'windows' },
  'U': { action: 'LOKÁTORY', icon: '🔁', bgColor: '#30D158', textColor: '#000', category: 'transport' },
  'I': { action: 'INSPEKTOR', icon: 'ℹ️', bgColor: '#FF9500', category: 'tracks', badge: 'INSP' },
  'O': { action: 'SMYČKY (LOOPS)', icon: '➰', bgColor: '#FF9500', category: 'windows' },
  'P': { action: 'PIANO ROLL', icon: '🎹', bgColor: '#FFD60A', textColor: '#000', category: 'windows' },
  '[': { action: 'POSUN TIK VLEVO', icon: '⏪', bgColor: '#30D158', textColor: '#000', category: 'transport' },
  ']': { action: 'POSUN TIK VPRAVO', icon: '⏩', bgColor: '#30D158', textColor: '#000', category: 'transport' },

  'A': { action: 'AUTOMACE', icon: '🎚️', bgColor: '#FFD60A', textColor: '#000', category: 'tracks', badge: 'AUTO' },
  'S': { action: 'SOLO STOPY', icon: '🟡', bgColor: '#FFD60A', textColor: '#000', category: 'tracks', badge: 'SOLO' },
  'D': { action: 'LIST EDIT', icon: '📋', bgColor: '#FFD60A', textColor: '#000', category: 'windows' },
  'F': { action: 'FLEX / MEDIA', icon: '📁', bgColor: '#FFD60A', textColor: '#000', category: 'tracks', badge: 'FLEX' },
  'G': { action: 'GLOBÁLNÍ STOPY', icon: '🌐', bgColor: '#30D158', textColor: '#000', category: 'tracks' },
  'H': { action: 'SKRÝT STOPU', icon: '👁️', bgColor: '#30D158', textColor: '#000', category: 'tracks', badge: 'HIDE' },
  'J': { action: 'SPOJIT REGIONY', icon: '🔗', bgColor: '#0A84FF', category: 'tools' },
  'K': { action: 'METRONOM', icon: '⏱️', bgColor: '#30D158', textColor: '#000', category: 'transport' },
  'L': { action: 'SMYČKA REGIONU', icon: '🔁', bgColor: '#0A84FF', category: 'tools' },
  ';': { action: 'POSUN NA SPL', icon: '📍', bgColor: '#30D158', textColor: '#000', category: 'transport' },
  "'": { action: 'SLEDOVAT HRANÍ', icon: '🎯', bgColor: '#30D158', textColor: '#000', category: 'transport' },

  'Z': { action: 'ZOOM VÝBĚRU', icon: '🔍', bgColor: '#0A84FF', category: 'tools', badge: 'ZOOM' },
  'X': { action: 'MIXÁŽNÍ PULT', icon: '🎛️', bgColor: '#FFD60A', textColor: '#000', category: 'tracks', badge: 'MIX' },
  'C': { action: 'CYKLUS (CYCLE)', icon: '🔄', bgColor: '#30D158', textColor: '#000', category: 'transport' },
  'V': { action: 'SKRÝT PLUG-INY', icon: '🔌', bgColor: '#FFD60A', textColor: '#000', category: 'tracks', badge: 'PLUG' },
  'B': { action: 'CHYTRÉ OVLADAČE', icon: '💡', bgColor: '#FFD60A', textColor: '#000', category: 'tracks', badge: 'SMART' },
  'N': { action: 'NOTACE (SCORE)', icon: '🎼', bgColor: '#FFD60A', textColor: '#000', category: 'windows' },
  'M': { action: 'MUTE STOPY', icon: '🔇', bgColor: '#BF5AF2', category: 'tracks', badge: 'MUTE' },
  ',': { action: 'POSUN VLEVO', icon: '◀️', bgColor: '#0A84FF', category: 'tools' },
  '.': { action: 'POSUN VPRAVO', icon: '▶️', bgColor: '#0A84FF', category: 'tools' },
  '/': { action: 'SKOK NA POZICI', icon: '🎯', bgColor: '#30D158', textColor: '#000', category: 'transport' },

  'TAB': { action: 'PREPÍNAČ OKEN', icon: '⇥', bgColor: '#8E8E93', category: 'tools' },
  'CAPS': { action: 'KLÁVESNICE MIDI', icon: '🎹', bgColor: '#BF5AF2', category: 'tools' },
  'Spacebar': { action: 'PREHRÁT / ZASTAVIT', icon: '⏯️', bgColor: '#30D158', textColor: '#000', category: 'transport', badge: 'PLAY' }
};

interface VirtualKeyboardProps {
  categories: ShortcutCategory[];
  searchQuery?: string;
  onClose?: () => void;
  onKeyComboChange?: (keys: string[]) => void;
  onUpdateCategoryColor?: (categoryId: string, newColor: string) => void;
  isSidebarOpen?: boolean;
  theme?: 'night' | 'day';
}

const PRESET_COLORS = [
  '#007AFF', // Apple Blue
  '#34C759', // Apple Green
  '#FF9500', // Apple Orange
  '#AF52DE', // Apple Purple
  '#FF2D55', // Apple Pink
  '#FFD60A', // Apple Yellow / Logic Gold
  '#30B0C7', // Apple Teal
  '#5856D6', // Apple Indigo
  '#FF3B30', // Apple Red
  '#E5A93C'  // Amber
];

interface KeyConfig {
  id: string;
  label: string;
  subLabel?: string;
  symbols?: string[]; // Symbols used in shortcuts like '⌘', '⌥', 'A', etc.
  width?: string; // e.g. 'flex-[1.5]' or 'w-12'
  keyCodeMatches?: string[]; // e.g. ['KeyA', 'a', 'A']
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  categories,
  searchQuery = '',
  onClose,
  onKeyComboChange,
  onUpdateCategoryColor,
  isSidebarOpen = false,
  theme = 'night'
}) => {
  const isDay = theme === 'day';
  const [pressedKeyCodes, setPressedKeyCodes] = useState<Set<string>>(new Set());
  const [activeSymbols, setActiveSymbols] = useState<string[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [isColorCodedKeys, setIsColorCodedKeys] = useState(true);
  const [isDawMode, setIsDawMode] = useState(true);
  const [dawCategoryFilter, setDawCategoryFilter] = useState<'all' | 'tools' | 'tracks' | 'transport' | 'windows'>('all');
  const [activePresetPickerId, setActivePresetPickerId] = useState<string | null>(null);
  const [kbdScale, setKbdScale] = useState(1.0);


  const [matchingShortcut, setMatchingShortcut] = useState<{
    shortcut: ShortcutItem;
    categoryTitle: string;
    categoryColor: string;
  } | null>(null);

  // Normalize key string for robust comparison
  const normalizeKey = (k: string): string => {
    const s = k.trim().toUpperCase();
    if (s === 'COMMAND' || s === 'CMD' || s === 'META' || s === '⌘') return '⌘';
    if (s === 'OPTION' || s === 'ALT' || s === '⌥') return '⌥';
    if (s === 'SHIFT' || s === '⇧') return '⇧';
    if (s === 'CONTROL' || s === 'CTRL' || s === '⌃') return '⌃';
    if (s === 'MEZERNÍK' || s === 'SPACE' || s === ' ' || s === 'MEZERNÍK (SPACE)') return 'SPACE';
    if (s === 'ESC' || s === 'ESCAPE') return 'ESC';
    if (s === 'RETURN' || s === 'ENTER' || s === '↩') return 'ENTER';
    if (s === 'DELETE' || s === 'BACKSPACE' || s === '⌫') return 'DELETE';
    if (s === 'TAB' || s === '⇥') return 'TAB';
    if (s === 'CAPS' || s === 'CAPS LOCK') return 'CAPS';
    return s;
  };

  // Calculate keys matched by current search query
  const searchMatchedKeySet = new Set<string>();
  const matchingShortcutsForSearch: { shortcut: ShortcutItem; categoryTitle: string }[] = [];

  const trimmedQuery = searchQuery.trim().toLowerCase();

  if (trimmedQuery.length > 0) {
    categories.forEach((cat) => {
      cat.shortcuts.forEach((sc) => {
        const labelMatch = sc.label.toLowerCase().includes(trimmedQuery);
        const categoryMatch = cat.title.toLowerCase().includes(trimmedQuery);
        const keysMatch = sc.keys.some((k) => {
          const kLower = k.toLowerCase();
          if (kLower.includes(trimmedQuery)) return true;
          if ((trimmedQuery === 'cmd' || trimmedQuery === 'command') && k === '⌘') return true;
          if ((trimmedQuery === 'option' || trimmedQuery === 'alt') && k === '⌥') return true;
          if (trimmedQuery === 'shift' && k === '⇧') return true;
          if ((trimmedQuery === 'ctrl' || trimmedQuery === 'control') && k === '⌃') return true;
          if ((trimmedQuery === 'space' || trimmedQuery === 'mezerník') && (k.toLowerCase().includes('mezer') || k === ' ')) return true;
          return false;
        });

        if (labelMatch || categoryMatch || keysMatch) {
          matchingShortcutsForSearch.push({ shortcut: sc, categoryTitle: cat.title });
          sc.keys.forEach((k) => searchMatchedKeySet.add(normalizeKey(k)));
        }
      });
    });
  }

  // Check if a key is matched by search
  const isKeySearchMatched = (key: KeyConfig): boolean => {
    if (searchMatchedKeySet.size === 0) return false;

    const candidateKeys = [
      key.id,
      key.label,
      key.subLabel,
      ...(key.symbols || []),
      ...(key.keyCodeMatches || [])
    ].filter(Boolean) as string[];

    return candidateKeys.some((candidate) => searchMatchedKeySet.has(normalizeKey(candidate)));
  };

  // Listen for physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing inside form inputs
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      setPressedKeyCodes((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });

      // Construct shortcut symbols
      const symbols: string[] = [];
      if (e.metaKey) symbols.push('⌘');
      if (e.altKey) symbols.push('⌥');
      if (e.shiftKey) symbols.push('⇧');
      if (e.ctrlKey) symbols.push('⌃');

      let mainKey = e.key;
      if (mainKey === ' ') mainKey = 'Mezerník';
      else if (mainKey === 'Escape') mainKey = 'Esc';
      else if (mainKey === 'ArrowLeft') mainKey = '←';
      else if (mainKey === 'ArrowRight') mainKey = '→';
      else if (mainKey === 'ArrowUp') mainKey = '↑';
      else if (mainKey === 'ArrowDown') mainKey = '↓';
      else if (mainKey.length === 1) mainKey = mainKey.toUpperCase();

      if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key) && mainKey) {
        symbols.push(mainKey);
      }

      setActiveSymbols(symbols);
      if (onKeyComboChange) onKeyComboChange(symbols);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeyCodes((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });

      // Check remaining modifiers
      setTimeout(() => {
        const symbols: string[] = [];
        if (e.metaKey) symbols.push('⌘');
        if (e.altKey) symbols.push('⌥');
        if (e.shiftKey) symbols.push('⇧');
        if (e.ctrlKey) symbols.push('⌃');

        setActiveSymbols(symbols);
        if (onKeyComboChange) onKeyComboChange(symbols);
      }, 50);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyComboChange]);

  // Find matching shortcut whenever activeSymbols change
  useEffect(() => {
    if (activeSymbols.length === 0) {
      setMatchingShortcut(null);
      return;
    }

    let found: { shortcut: ShortcutItem; categoryTitle: string; categoryColor: string } | null = null;

    for (const cat of categories) {
      for (const sc of cat.shortcuts) {
        // Compare arrays irrespective of order
        const scKeysNorm = sc.keys.map((k) => k.trim().toUpperCase());
        const activeNorm = activeSymbols.map((k) => k.trim().toUpperCase());

        if (
          scKeysNorm.length === activeNorm.length &&
          scKeysNorm.every((k) => activeNorm.includes(k))
        ) {
          found = {
            shortcut: sc,
            categoryTitle: cat.title,
            categoryColor: cat.accentColor
          };
          break;
        }
      }
      if (found) break;
    }

    setMatchingShortcut(found);
  }, [activeSymbols, categories]);

  // Handle clicking virtual keys
  const toggleVirtualKey = (symbols: string[], primaryCode: string) => {
    setPressedKeyCodes((prev) => {
      const next = new Set(prev);
      if (next.has(primaryCode)) {
        next.delete(primaryCode);
      } else {
        next.add(primaryCode);
      }
      return next;
    });

    setActiveSymbols((prev) => {
      const symbol = symbols[0];
      if (!symbol) return prev;
      let next: string[];
      if (prev.includes(symbol)) {
        next = prev.filter((s) => s !== symbol);
      } else {
        next = [...prev, symbol];
      }
      if (onKeyComboChange) onKeyComboChange(next);
      return next;
    });
  };

  const clearVirtualKeys = () => {
    setPressedKeyCodes(new Set());
    setActiveSymbols([]);
    if (onKeyComboChange) onKeyComboChange([]);
  };

  // Check if a virtual key is currently pressed
  const isKeyPressed = (codes: string[], symbols: string[] = []) => {
    const isCodeMatch = codes.some((code) => pressedKeyCodes.has(code));
    const isSymbolMatch = symbols.some((sym) => activeSymbols.includes(sym));
    return isCodeMatch || isSymbolMatch;
  };

  // Keyboard Rows definition
  const row0: KeyConfig[] = [
    { id: 'esc', label: 'esc', symbols: ['Esc'], keyCodeMatches: ['Escape'] },
    { id: 'f1', label: 'F1', symbols: ['F1'], keyCodeMatches: ['F1'] },
    { id: 'f2', label: 'F2', symbols: ['F2'], keyCodeMatches: ['F2'] },
    { id: 'f3', label: 'F3', symbols: ['F3'], keyCodeMatches: ['F3'] },
    { id: 'f4', label: 'F4', symbols: ['F4'], keyCodeMatches: ['F4'] },
    { id: 'f5', label: 'F5', symbols: ['F5'], keyCodeMatches: ['F5'] },
    { id: 'f6', label: 'F6', symbols: ['F6'], keyCodeMatches: ['F6'] },
    { id: 'f7', label: 'F7', symbols: ['F7'], keyCodeMatches: ['F7'] },
    { id: 'f8', label: 'F8', symbols: ['F8'], keyCodeMatches: ['F8'] },
    { id: 'f9', label: 'F9', symbols: ['F9'], keyCodeMatches: ['F9'] },
    { id: 'f10', label: 'F10', symbols: ['F10'], keyCodeMatches: ['F10'] },
    { id: 'f11', label: 'F11', symbols: ['F11'], keyCodeMatches: ['F11'] },
    { id: 'f12', label: 'F12', symbols: ['F12'], keyCodeMatches: ['F12'] }
  ];

  const row1: KeyConfig[] = [
    { id: 'backquote', label: '~', subLabel: '`', symbols: ['~', '`'], keyCodeMatches: ['Backquote'] },
    { id: '1', label: '1', subLabel: '!', symbols: ['1', '!'], keyCodeMatches: ['Digit1'] },
    { id: '2', label: '2', subLabel: '@', symbols: ['2', '@'], keyCodeMatches: ['Digit2'] },
    { id: '3', label: '3', subLabel: '#', symbols: ['3', '#'], keyCodeMatches: ['Digit3'] },
    { id: '4', label: '4', subLabel: '$', symbols: ['4', '$'], keyCodeMatches: ['Digit4'] },
    { id: '5', label: '5', subLabel: '%', symbols: ['5', '%'], keyCodeMatches: ['Digit5'] },
    { id: '6', label: '6', subLabel: '^', symbols: ['6', '^'], keyCodeMatches: ['Digit6'] },
    { id: '7', label: '7', subLabel: '&', symbols: ['7', '&'], keyCodeMatches: ['Digit7'] },
    { id: '8', label: '8', subLabel: '*', symbols: ['8', '*'], keyCodeMatches: ['Digit8'] },
    { id: '9', label: '9', subLabel: '(', symbols: ['9', '('], keyCodeMatches: ['Digit9'] },
    { id: '0', label: '0', subLabel: ')', symbols: ['0', ')'], keyCodeMatches: ['Digit0'] },
    { id: 'minus', label: '-', subLabel: '_', symbols: ['-', '_'], keyCodeMatches: ['Minus'] },
    { id: 'equal', label: '=', subLabel: '+', symbols: ['=', '+'], keyCodeMatches: ['Equal'] },
    { id: 'backspace', label: 'delete', width: 'flex-[1.6]', symbols: ['Delete', 'Backspace', '⌫'], keyCodeMatches: ['Backspace', 'Delete'] }
  ];

  const row2: KeyConfig[] = [
    { id: 'tab', label: 'tab', width: 'flex-[1.5]', symbols: ['Tab', '⇥'], keyCodeMatches: ['Tab'] },
    { id: 'q', label: 'Q', symbols: ['Q'], keyCodeMatches: ['KeyQ'] },
    { id: 'w', label: 'W', symbols: ['W'], keyCodeMatches: ['KeyW'] },
    { id: 'e', label: 'E', symbols: ['E'], keyCodeMatches: ['KeyE'] },
    { id: 'r', label: 'R', symbols: ['R'], keyCodeMatches: ['KeyR'] },
    { id: 't', label: 'T', symbols: ['T'], keyCodeMatches: ['KeyT'] },
    { id: 'y', label: 'Y', symbols: ['Y'], keyCodeMatches: ['KeyY'] },
    { id: 'u', label: 'U', symbols: ['U'], keyCodeMatches: ['KeyU'] },
    { id: 'i', label: 'I', symbols: ['I'], keyCodeMatches: ['KeyI'] },
    { id: 'o', label: 'O', symbols: ['O'], keyCodeMatches: ['KeyO'] },
    { id: 'p', label: 'P', symbols: ['P'], keyCodeMatches: ['KeyP'] },
    { id: 'bracketleft', label: '[', subLabel: '{', symbols: ['['], keyCodeMatches: ['BracketLeft'] },
    { id: 'bracketright', label: ']', subLabel: '}', symbols: [']'], keyCodeMatches: ['BracketRight'] },
    { id: 'backslash', label: '\\', subLabel: '|', symbols: ['\\'], keyCodeMatches: ['Backslash'] }
  ];

  const row3: KeyConfig[] = [
    { id: 'caps', label: 'caps lock', width: 'flex-[1.8]', symbols: ['Caps'], keyCodeMatches: ['CapsLock'] },
    { id: 'a', label: 'A', symbols: ['A'], keyCodeMatches: ['KeyA'] },
    { id: 's', label: 'S', symbols: ['S'], keyCodeMatches: ['KeyS'] },
    { id: 'd', label: 'D', symbols: ['D'], keyCodeMatches: ['KeyD'] },
    { id: 'f', label: 'F', symbols: ['F'], keyCodeMatches: ['KeyF'] },
    { id: 'g', label: 'G', symbols: ['G'], keyCodeMatches: ['KeyG'] },
    { id: 'h', label: 'H', symbols: ['H'], keyCodeMatches: ['KeyH'] },
    { id: 'j', label: 'J', symbols: ['J'], keyCodeMatches: ['KeyJ'] },
    { id: 'k', label: 'K', symbols: ['K'], keyCodeMatches: ['KeyK'] },
    { id: 'l', label: 'L', symbols: ['L'], keyCodeMatches: ['KeyL'] },
    { id: 'semicolon', label: ';', subLabel: ':', symbols: [';'], keyCodeMatches: ['Semicolon'] },
    { id: 'quote', label: "'", subLabel: '"', symbols: ["'"], keyCodeMatches: ['Quote'] },
    { id: 'enter', label: 'return', width: 'flex-[2.1]', symbols: ['Enter', 'Return', '↩'], keyCodeMatches: ['Enter'] }
  ];

  const row4: KeyConfig[] = [
    { id: 'shiftleft', label: 'shift ⇧', width: 'flex-[2.3]', symbols: ['⇧', 'Shift'], keyCodeMatches: ['ShiftLeft'] },
    { id: 'z', label: 'Z', symbols: ['Z'], keyCodeMatches: ['KeyZ'] },
    { id: 'x', label: 'X', symbols: ['X'], keyCodeMatches: ['KeyX'] },
    { id: 'c', label: 'C', symbols: ['C'], keyCodeMatches: ['KeyC'] },
    { id: 'v', label: 'V', symbols: ['V'], keyCodeMatches: ['KeyV'] },
    { id: 'b', label: 'B', symbols: ['B'], keyCodeMatches: ['KeyB'] },
    { id: 'n', label: 'N', symbols: ['N'], keyCodeMatches: ['KeyN'] },
    { id: 'm', label: 'M', symbols: ['M'], keyCodeMatches: ['KeyM'] },
    { id: 'comma', label: ',', subLabel: '<', symbols: [','], keyCodeMatches: ['Comma'] },
    { id: 'period', label: '.', subLabel: '>', symbols: ['.'], keyCodeMatches: ['Period'] },
    { id: 'slash', label: '/', subLabel: '?', symbols: ['/'], keyCodeMatches: ['Slash'] },
    { id: 'shiftright', label: 'shift ⇧', width: 'flex-[2.3]', symbols: ['⇧', 'Shift'], keyCodeMatches: ['ShiftRight'] }
  ];

  const row5: KeyConfig[] = [
    { id: 'fn', label: 'fn', symbols: ['fn'], keyCodeMatches: ['Fn'] },
    { id: 'ctrl', label: 'control ⌃', symbols: ['⌃', 'Control', 'Ctrl'], keyCodeMatches: ['ControlLeft', 'ControlRight'] },
    { id: 'altleft', label: 'option ⌥', width: 'flex-[1.2]', symbols: ['⌥', 'Option', 'Alt'], keyCodeMatches: ['AltLeft'] },
    { id: 'metaleft', label: 'command ⌘', width: 'flex-[1.5]', symbols: ['⌘', 'Command', 'Cmd', 'Meta'], keyCodeMatches: ['MetaLeft'] },
    { id: 'space', label: 'Mezerník (Space)', width: 'flex-[6]', symbols: ['Mezerník', 'Space', ' '], keyCodeMatches: ['Space'] },
    { id: 'metaright', label: 'command ⌘', width: 'flex-[1.5]', symbols: ['⌘', 'Command', 'Cmd', 'Meta'], keyCodeMatches: ['MetaRight'] },
    { id: 'altright', label: 'option ⌥', width: 'flex-[1.2]', symbols: ['⌥', 'Option', 'Alt'], keyCodeMatches: ['AltRight'] },
    { id: 'arrowleft', label: '←', symbols: ['←', 'Left'], keyCodeMatches: ['ArrowLeft'] },
    { id: 'arrowupdown', label: '↑ / ↓', symbols: ['↑', '↓', 'Up', 'Down'], keyCodeMatches: ['ArrowUp', 'ArrowDown'] },
    { id: 'arrowright', label: '→', symbols: ['→', 'Right'], keyCodeMatches: ['ArrowRight'] }
  ];

  // Helper to find category for a given key
  const getKeyCategories = (key: KeyConfig): ShortcutCategory[] => {
    const candidateKeys = [
      key.id,
      key.label,
      key.subLabel,
      ...(key.symbols || []),
      ...(key.keyCodeMatches || [])
    ].filter(Boolean).map((k) => normalizeKey(k as string));

    return categories.filter((cat) =>
      cat.shortcuts.some((sc) =>
        sc.keys.some((k) => candidateKeys.includes(normalizeKey(k)))
      )
    );
  };

  const renderKey = (key: KeyConfig) => {
    const active = isKeyPressed(key.keyCodeMatches || [], key.symbols || []);
    const searchMatched = isKeySearchMatched(key);
    const keyCats = getKeyCategories(key);
    const primaryCat = keyCats[0];

    const labelUpper = key.label.toUpperCase();
    const idUpper = key.id.toUpperCase();
    const codeMatchUpper = key.keyCodeMatches?.[0]?.replace('Key', '')?.toUpperCase() || '';

    const dawInfo = isDawMode
      ? (LOGIC_DAW_KEYMAP[labelUpper] ||
         LOGIC_DAW_KEYMAP[idUpper] ||
         LOGIC_DAW_KEYMAP[codeMatchUpper] ||
         ((key.id === 'space' || key.id === 'spacebar' || key.label.toLowerCase().includes('mezerník') || key.label.toLowerCase().includes('space')) ? LOGIC_DAW_KEYMAP['Spacebar'] : undefined))
      : undefined;

    const isDawCategoryMatched = dawCategoryFilter === 'all' || (dawInfo && dawInfo.category === dawCategoryFilter);

    const isFilterMatched = selectedCategoryFilter
      ? keyCats.some((c) => c.id === selectedCategoryFilter)
      : false;

    let keyClasses = 'bg-gradient-to-b from-[#2D2D36] to-[#1E1E26] text-gray-200 border-white/10 hover:border-white/30 hover:bg-[#343440] active:scale-95 shadow-sm';
    let inlineStyle: React.CSSProperties = {};

    if (active && searchMatched) {
      keyClasses = 'bg-gradient-to-b from-amber-400 via-emerald-400 to-cyan-400 text-black border-amber-300 shadow-[0_0_16px_rgba(52,211,153,0.8)] scale-[0.98] font-bold z-20 ring-2 ring-emerald-300';
    } else if (active) {
      keyClasses = 'bg-gradient-to-b from-amber-400 to-amber-500 text-black border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)] scale-[0.98] font-bold z-10';
    } else if (searchMatched) {
      keyClasses = 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.7)] scale-[1.02] font-bold z-10 ring-2 ring-cyan-400 animate-pulse';
    } else if (selectedCategoryFilter) {
      if (isFilterMatched && primaryCat) {
        const catColor = categories.find((c) => c.id === selectedCategoryFilter)?.accentColor || primaryCat.accentColor;
        keyClasses = 'text-white font-bold z-10 scale-[1.02] shadow-lg ring-2';
        inlineStyle = {
          backgroundColor: catColor,
          borderColor: '#FFFFFF',
          boxShadow: `0 0 14px ${catColor}AA`,
          color: '#FFFFFF'
        };
      } else {
        keyClasses = 'bg-[#1C1C24] text-gray-600 border-white/5 opacity-30';
      }
    } else if (isDawMode && dawInfo) {
      if (isDawCategoryMatched) {
        inlineStyle = {
          backgroundColor: dawInfo.bgColor,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          color: dawInfo.textColor || '#FFFFFF',
          boxShadow: `0 0 10px ${dawInfo.bgColor}88`
        };
        keyClasses = 'font-bold z-10 hover:scale-[1.05] transition-transform ring-1 ring-white/20';
      } else {
        inlineStyle = {
          backgroundColor: '#1E1E26',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          color: '#6B7280'
        };
        keyClasses = 'opacity-30 scale-[0.97] transition-all';
      }
    } else if (isColorCodedKeys && primaryCat) {
      inlineStyle = {
        borderColor: `${primaryCat.accentColor}88`,
        boxShadow: `0 0 6px ${primaryCat.accentColor}22`
      };
    }

    return (
      <button
        key={key.id}
        type="button"
        onClick={() => toggleVirtualKey(key.symbols || [key.label], key.keyCodeMatches?.[0] || key.id)}
        style={inlineStyle}
        className={`relative h-10 rounded-md border text-center font-medium transition-all duration-150 select-none flex flex-col items-center justify-between p-0.5 cursor-pointer overflow-hidden ${
          key.width ? key.width : 'flex-1 min-w-[32px]'
        } ${keyClasses}`}
        title={dawInfo ? `Logic Pro: ${key.label} → ${dawInfo.action}` : key.label}
      >
        {/* Sublabel, DAW Icon, and Track Control Badge */}
        <div className="w-full flex items-center justify-between px-0.5 leading-none">
          {key.subLabel && !dawInfo && (
            <span className={`text-[6.5pt] ${active ? 'text-black/80' : searchMatched ? 'text-cyan-100' : 'text-gray-400'}`}>
              {key.subLabel}
            </span>
          )}
          {dawInfo?.icon && (
            <span className="text-[7.5pt] leading-none shrink-0 drop-shadow">
              {dawInfo.icon}
            </span>
          )}
          {dawInfo?.badge && isDawCategoryMatched && (
            <span className="text-[5pt] font-mono font-black px-1 rounded bg-black/40 text-white border border-white/30 leading-tight">
              {dawInfo.badge}
            </span>
          )}
        </div>

        {/* Main Key Symbol */}
        <span className="text-[8.5pt] tracking-tight leading-none font-bold">
          {key.label}
        </span>

        {/* DAW Action Name or Category Dot */}
        {dawInfo ? (
          <span className="text-[5.5pt] uppercase tracking-tighter leading-none px-0.5 font-mono truncate max-w-full opacity-90 drop-shadow-sm font-black">
            {dawInfo.action}
          </span>
        ) : isColorCodedKeys && !selectedCategoryFilter && primaryCat && !active && !searchMatched ? (
          <span
            className="w-2 h-0.5 rounded-full shadow-sm mb-0.5"
            style={{ backgroundColor: primaryCat.accentColor }}
          />
        ) : (
          <span className="h-0.5" />
        )}
      </button>
    );
  };

  return (
    <div className={`no-print border-b p-3 shadow-2xl transition-all duration-300 animate-fade-in ${
      isDay ? 'bg-slate-200 border-slate-300 text-slate-900' : 'bg-[#18181F] border-amber-500/30 text-white'
    }`}>
      <div className="max-w-5xl mx-auto flex flex-col gap-2.5">
        {/* Top bar: Status & Active Combo Banner */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  Interaktivní Klávesnice
                </h3>

                {/* DAW Layout Mode Switcher */}
                <div className="flex items-center gap-1 bg-[#282835] p-1 rounded-lg border border-white/10 ml-2">
                  <button
                    type="button"
                    onClick={() => setIsDawMode(true)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-1 ${
                      isDawMode
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>🎛️ Logic Pro DAW Layout</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDawMode(false)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-1 ${
                      !isDawMode
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span> macOS Standard</span>
                  </button>
                </div>

                {/* Keyboard Zoom Control */}
                <div className="flex items-center gap-1 bg-[#282835] p-1 rounded-lg border border-white/10 ml-2">
                  <span className="text-[10px] text-gray-400 font-medium hidden sm:inline px-1">Zoom:</span>
                  <button
                    type="button"
                    onClick={() => setKbdScale((s) => Math.max(0.6, Math.round((s - 0.1) * 10) / 10))}
                    className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                    title="Oddálit klávesnici"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-amber-300 w-9 text-center font-bold">
                    {Math.round(kbdScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setKbdScale((s) => Math.min(1.4, Math.round((s + 0.1) * 10) / 10))}
                    className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                    title="Přiblížit klávesnici"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setKbdScale(1.0)}
                    className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                    title="Obnovit zoom klávesnice (100%)"
                  >
                    <Maximize2 className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        {/* Logic Pro DAW Layout Selection Filter Bar */}
        {isDawMode && (
          <div className="bg-[#1C1C24] p-2 rounded-xl border border-amber-500/30 flex items-center justify-between flex-wrap gap-2 shadow-inner animate-in fade-in">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Logic Pro DAW Nástroje & Výběr Ovladačů:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              <button
                type="button"
                onClick={() => setDawCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[10.5pt] font-bold transition-all flex items-center gap-1 ${
                  dawCategoryFilter === 'all'
                    ? 'bg-amber-500 text-black shadow-md ring-1 ring-amber-300'
                    : 'bg-[#282835] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <span>🎛️ Všechny Klavesy</span>
              </button>

              <button
                type="button"
                onClick={() => setDawCategoryFilter('tools')}
                className={`px-2.5 py-1 rounded-lg text-[10.5pt] font-bold transition-all flex items-center gap-1 ${
                  dawCategoryFilter === 'tools'
                    ? 'bg-blue-600 text-white shadow-md ring-1 ring-blue-300'
                    : 'bg-[#282835] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <span>🧰 Nástroje & Edice</span>
              </button>

              <button
                type="button"
                onClick={() => setDawCategoryFilter('tracks')}
                className={`px-2.5 py-1 rounded-lg text-[10.5pt] font-bold transition-all flex items-center gap-1 ${
                  dawCategoryFilter === 'tracks'
                    ? 'bg-yellow-500 text-black shadow-md ring-1 ring-yellow-300'
                    : 'bg-[#282835] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <span>🎚️ Ovladače Stop & Mixer</span>
              </button>

              <button
                type="button"
                onClick={() => setDawCategoryFilter('transport')}
                className={`px-2.5 py-1 rounded-lg text-[10.5pt] font-bold transition-all flex items-center gap-1 ${
                  dawCategoryFilter === 'transport'
                    ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-300'
                    : 'bg-[#282835] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <span>⏯️ Transport & Navigace</span>
              </button>

              <button
                type="button"
                onClick={() => setDawCategoryFilter('windows')}
                className={`px-2.5 py-1 rounded-lg text-[10.5pt] font-bold transition-all flex items-center gap-1 ${
                  dawCategoryFilter === 'windows'
                    ? 'bg-orange-500 text-black shadow-md ring-1 ring-orange-300'
                    : 'bg-[#282835] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <span>🖥️ Okna & Editory</span>
              </button>
            </div>
          </div>
        )}
          <div className="flex items-center gap-2">
            {activeSymbols.length > 0 && (
              <div className="flex items-center gap-2 bg-[#25252D] px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-inner">
                <span className="text-[10px] text-gray-400 font-mono uppercase">Stisknuto:</span>
                <div className="flex items-center gap-1">
                  {activeSymbols.map((s, idx) => (
                    <kbd
                      key={idx}
                      className="mac-kbd text-xs bg-amber-500 text-black font-bold border-amber-400 px-1.5 py-0.5"
                    >
                      {s}
                    </kbd>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={clearVirtualKeys}
                  className="text-[10px] text-gray-400 hover:text-white ml-1 underline"
                >
                  Vymazat
                </button>
              </div>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Zavřít klávesnici"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Color Customization & Highlighting Toolbar */}
        <div className="bg-[#202029] p-2 rounded-xl border border-white/10 flex flex-col gap-2 shadow-inner">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-300 font-semibold">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>Barevné rozlišení & úprava kláves podle kategorií:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsColorCodedKeys(!isColorCodedKeys)}
                className={`text-[10px] px-2 py-0.5 rounded-lg font-medium border transition-all ${
                  isColorCodedKeys
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                }`}
              >
                {isColorCodedKeys ? '✓ Akcenty ZAP' : 'Akcenty VYP'}
              </button>

              {selectedCategoryFilter && (
                <button
                  type="button"
                  onClick={() => setSelectedCategoryFilter(null)}
                  className="text-[10px] text-amber-400 hover:underline font-mono"
                >
                  Zobrazit všechny
                </button>
              )}
            </div>
          </div>

          {/* Category Chips with Custom Color Pickers */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter(null)}
              className={`text-[10.5pt] px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
                selectedCategoryFilter === null
                  ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-md'
                  : 'bg-[#2A2A35] text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Všechny
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategoryFilter === cat.id;
              const isPickerOpen = activePresetPickerId === cat.id;

              return (
                <div key={cat.id} className="relative flex items-center">
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10.5pt] font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#2A2A36] text-white border-2 shadow-lg'
                        : 'bg-[#25252D] text-gray-300 border-white/10 hover:bg-white/10'
                    }`}
                    style={{
                      borderColor: isSelected ? cat.accentColor : undefined,
                      boxShadow: isSelected ? `0 0 10px ${cat.accentColor}55` : undefined
                    }}
                  >
                    {/* Clickable Color Dot & HTML Color Picker */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <span
                        className="w-3 h-3 rounded-full border border-white/30 cursor-pointer hover:scale-125 transition-transform"
                        style={{ backgroundColor: cat.accentColor }}
                        title={`Změnit barvu kategorie ${cat.title}`}
                      />
                      {onUpdateCategoryColor && (
                        <input
                          type="color"
                          value={cat.accentColor}
                          onChange={(e) => onUpdateCategoryColor(cat.id, e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          title="Vybrat vlastním paletovým výběrem"
                        />
                      )}
                    </div>

                    {/* Category Title button */}
                    <button
                      type="button"
                      onClick={() => setSelectedCategoryFilter(isSelected ? null : cat.id)}
                      className="hover:text-white flex items-center gap-1"
                      title={`Zvýraznit klávesy kategorie ${cat.title}`}
                    >
                      <span>{cat.title}</span>
                      <span className="text-[8.5pt] opacity-60 font-mono">({cat.shortcuts.length})</span>
                    </button>

                    {/* Preset Color Palette Quick Trigger */}
                    {onUpdateCategoryColor && (
                      <button
                        type="button"
                        onClick={() => setActivePresetPickerId(isPickerOpen ? null : cat.id)}
                        className="text-gray-400 hover:text-white p-0.5 rounded hover:bg-white/10 ml-0.5"
                        title="Rychlá paleta barev"
                      >
                        <Paintbrush className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Preset Color Popover Menu */}
                  {isPickerOpen && onUpdateCategoryColor && (
                    <div className="absolute top-full left-0 mt-1 z-50 bg-[#1A1A22] border border-white/20 p-2 rounded-xl shadow-2xl flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                      <span className="text-[9px] text-gray-400 font-mono mr-1">Paleta:</span>
                      {PRESET_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            onUpdateCategoryColor(cat.id, color);
                            setActivePresetPickerId(null);
                          }}
                          className="w-4 h-4 rounded-full border border-white/20 hover:scale-125 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => setActivePresetPickerId(null)}
                        className="text-gray-400 hover:text-white ml-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {trimmedQuery.length > 0 && (
          <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-500/40 p-2 rounded-xl flex items-center justify-between gap-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-cyan-300 font-bold mr-1">VYHLEDÁVÁNÍ KLÁVES:</span>
                <span className="text-white font-medium">"{searchQuery}"</span>
                <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {matchingShortcutsForSearch.length} {matchingShortcutsForSearch.length === 1 ? 'zkratka' : matchingShortcutsForSearch.length >= 2 && matchingShortcutsForSearch.length <= 4 ? 'zkratky' : 'zkratek'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 overflow-x-auto max-w-xs no-scrollbar">
              <span className="text-[10px] text-gray-400 mr-1">Zvýrazněné klávesy:</span>
              {Array.from(searchMatchedKeySet).slice(0, 10).map((k, i) => (
                <kbd key={i} className="mac-kbd text-xs bg-cyan-500 text-black font-bold border-cyan-300 px-1.5 py-0.5">
                  {k === 'SPACE' ? 'Mezerník' : k}
                </kbd>
              ))}
              {searchMatchedKeySet.size > 10 && (
                <span className="text-[10px] text-cyan-300 font-mono">+{searchMatchedKeySet.size - 10}</span>
              )}
            </div>
          </div>
        )}

        {/* Matching Shortcut Alert Banner if found via physical keys */}
        {matchingShortcut ? (
          <div className="bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 border border-emerald-500/40 p-2 rounded-xl flex items-center justify-between gap-3 text-xs animate-pulse">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-emerald-300 font-bold mr-1">NALEZENA ZKRATKA:</span>
                <span className="text-white font-medium">{matchingShortcut.shortcut.label}</span>
                <span
                  className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold"
                  style={{ backgroundColor: `${matchingShortcut.categoryColor}33`, color: matchingShortcut.categoryColor }}
                >
                  {matchingShortcut.categoryTitle}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {matchingShortcut.shortcut.keys.map((k, i) => (
                <kbd key={i} className="mac-kbd text-xs">
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ) : activeSymbols.length > 0 ? (
          <div className="bg-[#25252D]/60 border border-white/5 p-1.5 rounded-xl flex items-center gap-2 text-[11px] text-gray-400">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Žádná přímá zkratka v cheat sheetu neodpovídá této kombinaci. Zkuste např. <strong className="text-amber-300">⌘ + C</strong> nebo <strong className="text-amber-300">⌘ + Space</strong>.</span>
          </div>
        ) : null}

        {/* The Virtual Keybed Layout Container */}
        <div
          className="bg-[#111116] p-2.5 rounded-2xl border border-white/10 shadow-inner flex flex-col gap-1.5 overflow-x-auto no-scrollbar transition-all duration-200 origin-top"
          style={{
            transform: `scale(${kbdScale})`,
            transformOrigin: 'top center'
          }}
        >
          {/* Row 0: Fn row */}
          <div className="flex gap-1.5 w-full">{row0.map(renderKey)}</div>
          {/* Row 1: Number row */}
          <div className="flex gap-1.5 w-full">{row1.map(renderKey)}</div>
          {/* Row 2: QWERTY */}
          <div className="flex gap-1.5 w-full">{row2.map(renderKey)}</div>
          {/* Row 3: ASDF */}
          <div className="flex gap-1.5 w-full">{row3.map(renderKey)}</div>
          {/* Row 4: ZXCV */}
          <div className="flex gap-1.5 w-full">{row4.map(renderKey)}</div>
          {/* Row 5: Modifiers & Space */}
          <div className="flex gap-1.5 w-full">{row5.map(renderKey)}</div>
        </div>
      </div>
    </div>
  );
};
