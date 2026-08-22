import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, Moon, Sun, Download, BookOpen, Terminal, Sparkles, Zap, ArrowRight, X, Key } from 'lucide-react';
import { NavigationTab } from '../types';
import { KbdKey } from './KbdKey';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onTriggerDownload: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: 'General' | 'Navigation' | 'Actions' | 'Snippets';
  icon: React.ReactNode;
  shortcut?: string[];
  action: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  onNavigate,
  onTriggerDownload,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: PaletteAction[] = [
    {
      id: 'download',
      title: 'Download FastKey.exe (v2.4.0, 587 KB)',
      category: 'General',
      icon: <Download className="w-4 h-4 text-white" />,
      shortcut: ['Ctrl', 'D'],
      action: () => {
        onTriggerDownload();
        onClose();
      },
    },
    {
      id: 'nav-docs',
      title: 'Open Documentation & Step-by-Step Guide',
      category: 'Navigation',
      icon: <BookOpen className="w-4 h-4 text-zinc-300" />,
      shortcut: ['G', 'D'],
      action: () => {
        onNavigate('docs');
        onClose();
      },
    },
    {
      id: 'theme',
      title: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
      category: 'General',
      icon: isDark ? <Sun className="w-4 h-4 text-zinc-200" /> : <Moon className="w-4 h-4 text-zinc-700" />,
      shortcut: ['Ctrl', 'T'],
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'copy-sha',
      title: 'Copy SHA-256 Checksum Hash',
      category: 'Actions',
      icon: <Terminal className="w-4 h-4 text-zinc-300" />,
      action: () => {
        navigator.clipboard.writeText('6ae4fedef470f68b6fc0850979b014d7f00922000c6ea617cfe3e0bfa67db5e0');
        onClose();
      },
    },
    {
      id: 'hotkey-tester',
      title: 'View Allowed Websites & Config Guide',
      category: 'Navigation',
      icon: <Key className="w-4 h-4 text-zinc-300" />,
      action: () => {
        onNavigate('docs');
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`
          w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border transition-all transform animate-in zoom-in-95 duration-200
          ${isDark ? 'bg-[#121215] border-[#2A2B32] text-white shadow-black/80' : 'bg-white border-[#E2E8F0] text-zinc-950 shadow-zinc-400/30'}
        `}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search header */}
        <div className={`flex items-center px-4 py-3.5 border-b ${isDark ? 'border-[#23242A]' : 'border-[#E2E8F0]'}`}>
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, hotkey, or action... (e.g. docs, dark, download)"
            className="w-full bg-transparent outline-none text-base font-sans placeholder:text-zinc-500 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-zinc-500/20 text-zinc-400 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1">
            <KbdKey size="sm">ESC</KbdKey>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-transparent">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={item.action}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150
                    ${isSelected
                      ? (isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/10 text-black border border-black/20')
                      : (isDark ? 'hover:bg-white/5 text-zinc-300' : 'hover:bg-zinc-100 text-zinc-700')
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-[#1C1C22]' : 'bg-zinc-100'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-zinc-400">{item.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <div className="flex items-center gap-1">
                        {item.shortcut.map((k, i) => (
                          <KbdKey key={i} size="sm">{k}</KbdKey>
                        ))}
                      </div>
                    )}
                    {isSelected && (
                      <ArrowRight className="w-4 h-4 text-white ml-1" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className={`px-4 py-2.5 text-xs flex items-center justify-between border-t ${isDark ? 'border-[#23242A] bg-[#0E0E12] text-zinc-400' : 'border-[#E2E8F0] bg-zinc-50 text-zinc-600'}`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <KbdKey size="sm">↑</KbdKey>
              <KbdKey size="sm">↓</KbdKey>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <KbdKey size="sm">↵</KbdKey>
              <span>to select</span>
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono-code text-[11px] text-zinc-300">
            <Command className="w-3 h-3 text-white" /> FastKey Command Core v2.4.0
          </span>
        </div>
      </div>
    </div>
  );
};
