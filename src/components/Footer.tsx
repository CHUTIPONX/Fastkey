import React from 'react';
import { NavigationTab } from '../types';
import { Language, translations } from '../locales';
import { Download, BookOpen, ShieldCheck, ExternalLink, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  isDark: boolean;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDark, lang = 'th' }) => {
  const t = translations[lang].footer;
  const virusTotalUrl =
    'https://www.virustotal.com/gui/file/6ae4fedef470f68b6fc0850979b014d7f00922000c6ea617cfe3e0bfa67db5e0?nocache=1';

  return (
    <footer
      className={`
        w-full py-10 px-4 sm:px-6 border-t transition-colors
        ${isDark
          ? 'bg-[#08080A] border-zinc-800 text-zinc-400'
          : 'bg-zinc-100 border-zinc-200 text-zinc-600'
        }
      `}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="text-center sm:text-left">
          <div className={`font-display font-black text-lg ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            FastKey
          </div>
          <div className="text-xs text-zinc-500">
            {t.tagline}
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => onNavigate('download')}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'ดาวน์โหลด' : 'Download'}</span>
          </button>
          <button
            onClick={() => onNavigate('docs')}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'คู่มือการใช้งาน' : 'Documentation'}</span>
          </button>
          <a
            href={virusTotalUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400 font-mono-code text-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VirusTotal Clean</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-zinc-800/60 text-center text-xs text-zinc-400 font-mono-code">
        {t.copyright}
      </div>
    </footer>
  );
};
