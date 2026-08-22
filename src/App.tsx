/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab } from './types';
import { Language } from './locales';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { DocsSection } from './components/DocsSection';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { CommandPaletteModal } from './components/CommandPaletteModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('download');
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('th');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0A0A0B';
      document.body.style.color = '#E5E2E3';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, [isDark]);

  // Global hotkeys (Ctrl+K for palette, Ctrl+D for download)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setActiveTab('download');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'th' ? 'en' : 'th'));
  };

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative selection:bg-white/20 transition-colors duration-300 ${
        isDark ? 'bg-[#0A0A0B] text-[#E5E2E3]' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* 1. Dynamic Interactive Canvas Particles & Glow Background */}
      <InteractiveBackground isDark={isDark} />

      {/* 2. Scroll Progress Bar at Top */}
      <ScrollProgress />

      {/* 3. Global Command Palette Modal (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavigate={handleNavigate}
        onTriggerDownload={() => handleNavigate('download')}
      />

      {/* 4. Glassmorphism Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* 5. Main Views (Download & Docs only) */}
      <main className="flex-grow pt-16 relative z-10">
        {activeTab === 'download' && (
          <div className="animate-in fade-in duration-300 pt-4">
            <DownloadSection
              isDark={isDark}
              lang={lang}
              onNavigateToDocs={() => handleNavigate('docs')}
            />
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="animate-in fade-in duration-300 pt-4">
            <DocsSection
              isDark={isDark}
              onOpenCommandPalette={() => setIsPaletteOpen(true)}
              lang={lang}
            />
          </div>
        )}
      </main>

      {/* 6. Footer */}
      <Footer onNavigate={handleNavigate} isDark={isDark} lang={lang} />
    </div>
  );
}
