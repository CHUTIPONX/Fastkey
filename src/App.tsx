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
import { ShieldAlert } from 'lucide-react';

const warningPhrases = [
  'ของคนอื่น อย่าเคลมครับ',
  'โค้ดไม่ใช่ของแจกครับ',
  'เครดิตควรมี ไม่ใช่แค่โค้ด',
  'เก่งจริง คงเขียนเองได้',
  'ยืมได้ แต่ขออนุญาตก่อน',
  'เอาของคนอื่น ไม่เรียกเก่งนะ',
  'เครดิตหายไปไหนครับ',
  'โค้ดผม ไม่ใช่ผลงานคุณ',
  'ความสามารถไม่ใช่การคัดลอก',
  'อยากเก่ง ลองเขียนเองครับ',
  'ขโมยโค้ด ไม่เพิ่มสกิลครับ',
  'ของใคร ก็ให้เครดิตเจ้าของ',
  'Copy ได้ แต่ความเก่ง Copy ไม่ได้',
  'เอาโค้ดไป เอาความสามารถไปด้วยไหม',
  'ผลงานคนอื่น อย่าเอาชื่อตัวเอง',
  'ถ้าจะใช้ อย่างน้อยให้เกียรติกัน',
  'โค้ดมีเจ้าของ ไม่ใช่ของสาธารณะ',
  'เครดิตไม่เสียเงินนะครับ',
  'อย่าเอาความพยายามคนอื่นไปฟรี ๆ',
  'เขียนเองสักครั้ง จะเข้าใจครับ',
  'งานใครงานมัน อย่ามั่วครับ',
  'ก๊อปอย่างเดียวไม่เรียกพัฒนานะ',
  'เอาไปใช้ก็อย่าลืมที่มา',
  'ของฟรีไม่มีในโลกครับ',
  'อย่าเอาความขยันคนอื่นไปเป็นของตัวเอง',
  'เปิดดูได้ แต่อย่าเคลม',
  'เห็นโค้ดไม่ได้แปลว่าเป็นของคุณ',
  'มารยาทพื้นฐานมีไหมครับ',
  'เครดิตหาย หรือแกล้งลืมครับ',
  'เขียนเองเหนื่อยหน่อย แต่เท่กว่า',
  'อย่าขโมยแล้วทำเป็นไม่รู้',
  'โค้ดมีที่มา อย่าทำเป็นลืม',
  'ก๊อปงานไม่ใช่ความสามารถพิเศษ',
  'อย่าหยิบความพยายามคนอื่นไปหน้าตาเฉย',
  'ผลงานไม่ใช่ของกลางครับ',
  'เคารพเจ้าของงานด้วยครับ',
  'อย่าเอาความคิดคนอื่นไปขาย',
  'ก๊อปโค้ดไม่ได้ก๊อปเครดิตนะ',
  'อย่าทำเหมือนคิดเองครับ',
  'งานคนอื่น อย่าตีเนียน',
  'ใช้ได้ แต่อย่าลืมบอกที่มา',
  'ความพยายามคนอื่นมีราคาครับ',
  'อย่าข้ามขั้นตอนให้เกียรติกัน',
  'เห็นแล้วก็อย่าเอาไปเคลม',
  'เขียนเองดีกว่าไหมครับ',
  'อย่าหล่อด้วยงานคนอื่น',
  'เครดิตคือมารยาทพื้นฐาน',
  'อย่าเอาของคนอื่นมาแต่งชื่อใหม่',
  'ก๊อปได้ แต่คนเขียนเขารู้ครับ',
  'อย่าทำเป็นไม่เห็นเจ้าของงาน',
  'โค้ดดีเพราะคนเขียน ไม่ใช่คนก๊อป',
  'เอาไปใช้ก็บอกกันตรงๆ',
  'อย่าปลอมว่าเป็นผลงานตัวเอง',
  'ให้เกียรติกันหน่อยครับ',
  'เจ้าของงานยังอยู่ตรงนี้ครับ',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('download');
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('th');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isDevToolsWarningOpen, setIsDevToolsWarningOpen] = useState(false);

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

  // Keep the page in the protected state for browser inspection shortcuts and copy actions.
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing) return;

      const key = e.key.toLowerCase();
      const blockedDevToolsShortcut =
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        ((e.ctrlKey || e.metaKey) && key === 'u');

      if (blockedDevToolsShortcut) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setIsDevToolsWarningOpen(true);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && key === 'd') {
        e.preventDefault();
        setActiveTab('download');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, { capture: true });
  }, []);

  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();
    const blockCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setIsDevToolsWarningOpen(true);
    };
    const blockSelection = (e: Event) => e.preventDefault();
    const blockDrag = (e: DragEvent) => e.preventDefault();

    document.addEventListener('contextmenu', blockContextMenu);
    document.addEventListener('copy', blockCopy);
    document.addEventListener('cut', blockCopy);
    document.addEventListener('selectstart', blockSelection);
    document.addEventListener('dragstart', blockDrag);

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('cut', blockCopy);
      document.removeEventListener('selectstart', blockSelection);
      document.removeEventListener('dragstart', blockDrag);
    };
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

  if (isDevToolsWarningOpen) {
    return (
      <div className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-auto bg-[#09090B] px-6 py-12 text-center text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {warningPhrases.map((phrase, index) => (
            <span
              key={`${phrase}-${index}`}
              className="warning-float absolute whitespace-nowrap font-mono-code text-sm font-bold text-red-500/65 sm:text-base"
              style={{
                left: `${(index * 37) % 105 - 5}%`,
                top: `${(index * 61) % 100}%`,
                animationDelay: `${(index % 7) * -1.8}s`,
                animationDuration: `${12 + (index % 6) * 2}s`,
              }}
            >
              {phrase}
            </span>
          ))}
        </div>
        <div className="max-w-5xl">
          <div className="warning-icon-gloss mx-auto mb-8" aria-hidden="true">
            <ShieldAlert className="h-20 w-20 text-red-500" />
          </div>
          <p className="mb-6 font-display text-[20px] font-normal leading-tight">
            รบกวนอย่ายุ่งกับโค้ดของผมนะครับ ของคนอื่นควรให้เกียรติกันหน่อย
          </p>
          <p className="mb-10 text-lg font-bold text-zinc-400 sm:text-2xl">
            สมองหัดคิดเองบ้าง อย่ามัวแต่ขโมยโค้ดชาวบ้าน
          </p>
          <p className="text-sm font-semibold text-red-400/80">
            หน้านี้จบแค่นี้ครับ
          </p>
        </div>
      </div>
    );
  }

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
