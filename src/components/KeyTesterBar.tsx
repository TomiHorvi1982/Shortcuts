import React, { useEffect, useState } from 'react';
import { Keyboard, X } from 'lucide-react';

interface KeyTesterBarProps {
  activeKeys: string[];
  setActiveKeys: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
}

export const KeyTesterBar: React.FC<KeyTesterBarProps> = ({
  activeKeys,
  setActiveKeys,
  onClose
}) => {
  const [lastCombo, setLastCombo] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const keysPressed: string[] = [];

      if (e.metaKey) keysPressed.push('⌘');
      if (e.altKey) keysPressed.push('⌥');
      if (e.shiftKey) keysPressed.push('⇧');
      if (e.ctrlKey) keysPressed.push('⌃');

      let mainKey = e.key;
      if (mainKey === ' ') mainKey = 'Mezerník';
      else if (mainKey === 'Escape') mainKey = 'Esc';
      else if (mainKey === 'ArrowLeft') mainKey = '←';
      else if (mainKey === 'ArrowRight') mainKey = '→';
      else if (mainKey === 'ArrowUp') mainKey = '↑';
      else if (mainKey === 'ArrowDown') mainKey = '↓';
      else if (mainKey.length === 1) mainKey = mainKey.toUpperCase();

      if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key) && mainKey) {
        keysPressed.push(mainKey);
      }

      setActiveKeys(keysPressed);
      if (keysPressed.length > 0) {
        setLastCombo(keysPressed.join(' + '));
      }
    };

    const handleKeyUp = () => {
      // Clear after brief delay
      setTimeout(() => {
        setActiveKeys([]);
      }, 800);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setActiveKeys]);

  return (
    <div className="no-print bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-indigo-500/20 border-b border-amber-500/30 px-4 py-2 text-xs flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-2">
        <Keyboard className="w-4 h-4 text-amber-400 animate-pulse" />
        <span className="font-semibold text-amber-200">Klávesový Test aktivní:</span>
        <span className="text-gray-300">
          Stiskněte zkratku na klávesnici (např. ⌘+Space, R, ⌘+T)...
        </span>
      </div>

      <div className="flex items-center gap-3">
        {lastCombo && (
          <div className="flex items-center gap-1.5 bg-[#16161A] px-2.5 py-1 rounded-md border border-amber-500/40">
            <span className="text-gray-400 text-[10px]">Detekováno:</span>
            <span className="font-mono font-bold text-amber-300">{lastCombo}</span>
          </div>
        )}

        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white rounded hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
