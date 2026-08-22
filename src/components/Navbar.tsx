import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { Language, translations } from '../locales';
import { Moon, Sun, Download, BookOpen, Globe, ShieldCheck, Terminal, Zap, Sparkles, Layers, Sliders, FileCode } from 'lucide-react';
import { KbdKey } from './KbdKey';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  lang,
  onToggleLang,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'download', label: t.download, icon: <Download className="w-4 h-4" /> },
    { id: 'docs', label: t.docs, icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header
      id="main-header"
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? (isDark
              ? 'bg-[#0A0A0B]/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white/85 backdrop-blur-xl border-b border-zinc-200 shadow-md')
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onSelectTab('download')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-display text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                FastKey
              </span>
              <span className="text-[10px] uppercase font-mono-code font-bold px-1.5 py-0.5 rounded border border-white/20 bg-white/10 text-white shadow-sm">
                v2.4
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono-code hidden sm:block">
              0.12ms Native Core
            </div>
          </div>
        </button>

        {/* Center Nav Tabs */}
        <nav className="hidden sm:flex items-center gap-1 p-1 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all relative
                  ${isActive
                    ? 'text-black bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)] font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Command HUD trigger, Language, Theme, Download CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className={`
              hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-code transition-all
              ${isDark
                ? 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white'
                : 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:border-zinc-400'
              }
            `}
            title="Open Command Palette"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <div className="flex items-center gap-1">
              <KbdKey size="sm">Ctrl</KbdKey>
              <KbdKey size="sm">K</KbdKey>
            </div>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className={`
              flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono-code transition-all
              ${isDark
                ? 'bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-zinc-600'
                : 'bg-zinc-100 text-zinc-800 border border-zinc-200 hover:border-zinc-400'
              }
            `}
            title="สลับภาษา (TH / EN)"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-bold">{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`
              p-2 rounded-xl transition-all
              ${isDark
                ? 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white hover:border-zinc-600'
                : 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:text-black hover:border-zinc-400'
              }
            `}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Quick Download CTA */}
          <button
            onClick={() => onSelectTab('download')}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-white text-black font-extrabold text-xs shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-zinc-200 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">{t.quickDownload}</span>
            <span className="inline xs:hidden sm:hidden">โหลด</span>
          </button>
        </div>
      </div>

      {/* Mobile subnav row (visible only on small screens < sm) */}
      <div className="sm:hidden flex items-center justify-around px-3 py-1.5 border-t border-zinc-800/60 bg-[#0A0A0B]/95 backdrop-blur-md text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex-1 py-1.5 text-center rounded-lg font-semibold transition-colors ${
              activeTab === item.id
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
