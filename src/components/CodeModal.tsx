import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/generateHtml';
import { ShortcutCategory } from '../types';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: ShortcutCategory[];
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, categories }) => {
  const [copied, setCopied] = useState(false);
  const htmlCode = generateStandaloneHtml(categories);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'macOS_LogicPro_Master_CheatSheet.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1E1E24] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#16161A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-snug">
                Samostatný HTML/CSS Kód
              </h2>
              <p className="text-xs text-gray-400">
                Kompletní self-contained kód připravený pro export, zobrazení i tisk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Zkopírováno!' : 'Kopírovat HTML'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25252D] text-gray-200 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Stáhnout .html</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Viewport */}
        <div className="p-4 flex-1 overflow-auto bg-[#0F0F12]">
          <pre className="text-xs font-mono text-gray-300 leading-relaxed whitespace-pre-wrap selection:bg-blue-500/30 selection:text-white">
            {htmlCode}
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#16161A] border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimalizováno pro A4 Portrait (210mm x 297mm) s exact-print CSS</span>
          </div>
          <span className="text-gray-500 font-mono">HTML5 / CSS3 • {htmlCode.length} B</span>
        </div>
      </div>
    </div>
  );
};
