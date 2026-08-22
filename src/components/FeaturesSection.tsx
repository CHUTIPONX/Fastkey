import React, { useState, useEffect } from 'react';
import { CardTilt } from './CardTilt';
import { KbdKey } from './KbdKey';
import { Language, translations } from '../locales';
import {
  Terminal,
  Zap,
  Sliders,
  Send,
  Layers,
  ShieldCheck,
  Sparkles,
  Check,
  Copy,
  Keyboard,
  ArrowRight,
} from 'lucide-react';

interface FeaturesSectionProps {
  isDark: boolean;
  onOpenCommandPalette: () => void;
  lang?: Language;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  isDark,
  onOpenCommandPalette,
  lang = 'th',
}) => {
  const [activeShortcutTest, setActiveShortcutTest] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [pressedRealKeys, setPressedRealKeys] = useState<string[]>([]);

  const t = translations[lang].features;

  const testShortcut = (keyName: string) => {
    setActiveShortcutTest(keyName);
    setTimeout(() => setActiveShortcutTest(null), 1200);
  };

  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  // Physical keyboard live tester
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys: string[] = [];
      if (e.ctrlKey) keys.push('Ctrl');
      if (e.metaKey) keys.push('Cmd');
      if (e.altKey) keys.push('Alt');
      if (e.shiftKey) keys.push('Shift');
      const keyUpper = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      if (!['Control', 'Meta', 'Alt', 'Shift'].includes(e.key) && !keys.includes(keyUpper)) {
        keys.push(keyUpper);
      }
      if (keys.length > 0) {
        setPressedRealKeys(keys);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const features = [
    {
      id: 'launcher',
      icon: <Terminal className="w-6 h-6 text-white" />,
      badge: t.dock.tag,
      title: t.dock.title,
      description: t.dock.desc,
      shortcuts: ['Ctrl', 'Space'],
      interactiveDemo: (
        <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 font-mono-code text-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span>Fuzzy query: <strong className="text-white">&quot;deploy&quot;</strong></span>
            <span className="text-white font-medium">Exact match</span>
          </div>
          <div className="bg-white/10 border border-white/30 rounded-lg p-2 flex items-center justify-between text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            <span className="flex items-center gap-2">
              <span className="text-white font-bold">▶</span> pnpm run deploy:staging
            </span>
            <KbdKey size="sm">↵</KbdKey>
          </div>
        </div>
      ),
    },
    {
      id: 'macros',
      icon: <Zap className="w-6 h-6 text-zinc-200" />,
      badge: t.autoSend.tag,
      title: t.autoSend.title,
      description: t.autoSend.desc,
      shortcuts: ['Alt', 'Shift', 'M'],
      interactiveDemo: (
        <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 font-mono-code text-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span>Macro Sequence [3-Step]</span>
            <span className="text-white font-semibold">Armed</span>
          </div>
          <div className="space-y-1 text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">1.</span> Focus VSCode <span className="text-zinc-500 text-[10px]">(+10ms)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">2.</span> Send keys: <span className="text-white font-bold">&quot;git status\n&quot;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">3.</span> Minimize overlay
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'profiles',
      icon: <Layers className="w-6 h-6 text-zinc-200" />,
      badge: t.profiles.tag,
      title: t.profiles.title,
      description: t.profiles.desc,
      shortcuts: ['Ctrl', 'Alt', 'P'],
      interactiveDemo: (
        <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 font-mono-code text-xs">
          <div className="text-zinc-400 mb-2">Active Context Match:</div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <div className="bg-white/10 p-1.5 rounded border border-white/20 text-white flex items-center justify-between">
              <span>Code Editor</span>
              <span className="text-white font-bold text-[10px]">Active</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded border border-white/10 text-zinc-400 flex items-center justify-between">
              <span>Browser DevTools</span>
              <span className="text-zinc-500 text-[10px]">Standby</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'snippets',
      icon: <Sliders className="w-6 h-6 text-zinc-200" />,
      badge: t.clipboard.tag,
      title: t.clipboard.title,
      description: t.clipboard.desc,
      shortcuts: ['Ctrl', 'Shift', 'V'],
      interactiveDemo: (
        <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 font-mono-code text-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span>Trigger: <strong className="text-white">&quot;;react-fc&quot;</strong></span>
            <button
              onClick={() => handleCopySnippet("const Component: React.FC<Props> = () => { return <div></div>; };", "react-snip")}
              className="text-zinc-200 hover:text-white flex items-center gap-1 text-[11px]"
            >
              {copiedKey === 'react-snip' ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
              {copiedKey === 'react-snip' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="text-zinc-300 text-[11px] truncate bg-black/30 p-1.5 rounded">
            const Component: React.FC&lt;Props&gt; = () =&gt; &#123; ... &#125;
          </div>
        </div>
      ),
    },
    {
      id: 'sdk',
      icon: <Send className="w-6 h-6 text-zinc-200" />,
      badge: t.sdk.tag,
      title: t.sdk.title,
      description: t.sdk.desc,
      shortcuts: ['Ctrl', 'Alt', 'Enter'],
      interactiveDemo: (
        <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 font-mono-code text-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span>Target: <span className="text-zinc-200">tty2 (node worker)</span></span>
            <span className="text-zinc-300">Background</span>
          </div>
          <div className="text-[11px] text-zinc-300">
            TypeScript SDK Plugin bridge initialized.
          </div>
        </div>
      ),
    },
    {
      id: 'fuzzy',
      icon: <ShieldCheck className="w-6 h-6 text-zinc-200" />,
      badge: t.fuzzy.tag,
      title: t.fuzzy.title,
      description: t.fuzzy.desc,
      shortcuts: ['Ctrl', 'K'],
      interactiveDemo: (
        <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 font-mono-code text-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span>Security & Privacy:</span>
            <span className="text-white font-bold">100% Offline</span>
          </div>
          <div className="text-zinc-400 text-[11px]">
            VirusTotal certified clean binary with zero telemetry.
          </div>
        </div>
      ),
    },
  ];

  const interactiveShortcuts = [
    { label: 'Summon FastKey Dock', keys: ['Ctrl', 'Space'], action: 'เปิด HUD ค้นหาคำสั่งทันที' },
    { label: 'Git Smart Push', keys: ['Ctrl', 'Shift', 'G'], action: 'Stage, commit & push อัตโนมัติ' },
    { label: 'Kill Port 3000', keys: ['Alt', 'K'], action: 'สั่งหยุด Dev server port 3000 ทันที' },
    { label: 'Toggle Staging Config', keys: ['Ctrl', 'Alt', '1'], action: 'สลับ env เป็น Staging' },
    { label: 'Expand Boilerplate', keys: ['Ctrl', 'Shift', 'B'], action: 'แทรกแม่แบบโค้ดด่วน' },
    { label: 'Smart Clipboard History', keys: ['Ctrl', 'Shift', 'V'], action: 'เปิดประวัติคลิปบอร์ด' },
  ];

  return (
    <section id="features" className="py-24 px-4 md:px-8 max-w-[1240px] mx-auto">
      {/* Section Header with badge */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono-code text-zinc-200 mb-4 shadow-[0_0_12px_rgba(255,255,255,0.1)]">
          <Sparkles className="w-3.5 h-3.5 text-white" /> {t.badge}
        </div>
        <h2
          className={`
            font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4
            ${isDark ? 'text-white' : 'text-zinc-950'}
          `}
        >
          {t.title}
        </h2>
        <p className={`font-body text-base md:text-lg ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* 3x2 Grid of 3D Tilted Glass Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feat, index) => (
          <div
            key={feat.id}
            style={{
              animation: `revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s forwards`,
            }}
          >
            <CardTilt isDark={isDark} maxTilt={3.5} className="h-full">
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${isDark ? 'bg-[#1C1C24] border border-[#2B2B34]' : 'bg-zinc-100 border border-zinc-200'}`}>
                      {feat.icon}
                    </div>
                    <span className="text-[11px] font-mono-code font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className={`font-display text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                    {feat.title}
                  </h3>

                  <p className={`font-body text-sm leading-relaxed mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {feat.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-zinc-400 font-mono-code">Shortcut:</span>
                    <div className="flex items-center gap-1">
                      {feat.shortcuts.map((k, i) => (
                        <KbdKey key={i} size="sm">{k}</KbdKey>
                      ))}
                    </div>
                  </div>

                  {feat.interactiveDemo}
                </div>
              </div>
            </CardTilt>
          </div>
        ))}
      </div>

      {/* Interactive Keyboard Shortcut Tester Playground */}
      <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 glass-panel border border-[#2E2E38] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-zinc-300 font-semibold mb-2">
              <Keyboard className="w-4 h-4 text-white" /> {t.interactiveTester}
            </div>
            <h3 className={`font-display text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              Interactive Shortcut Keypad
            </h3>
            <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {t.pressKeyPrompt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {pressedRealKeys.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/30 text-xs font-mono-code">
                <span className="text-zinc-400">{t.detectedKey}</span>
                <div className="flex items-center gap-1">
                  {pressedRealKeys.map((k, i) => (
                    <KbdKey key={i} size="sm" active={true}>{k}</KbdKey>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onOpenCommandPalette}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${isDark
                  ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-black text-white hover:bg-zinc-800 shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                }
              `}
            >
              <span>{t.viewAllShortcuts}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hotkey matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interactiveShortcuts.map((item, index) => {
            const isTested = activeShortcutTest === item.label;
            return (
              <div
                key={index}
                onClick={() => testShortcut(item.label)}
                className={`
                  p-4 rounded-xl cursor-pointer transition-all border select-none
                  ${isTested
                    ? (isDark ? 'bg-white/20 border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.02]' : 'bg-black/10 border-black shadow-[0_2px_10px_rgba(0,0,0,0.15)] scale-[1.02]')
                    : (isDark ? 'bg-[#15151A] border-[#262630] hover:border-white/30' : 'bg-white border-zinc-200 hover:border-black/30')
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold font-display">{item.label}</span>
                  {isTested ? (
                    <span className="text-xs font-mono-code text-white flex items-center gap-1 font-bold animate-pulse">
                      <Check className="w-3.5 h-3.5" /> Triggered!
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400 font-mono-code">Click / Press</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {item.keys.map((k, i) => (
                      <KbdKey key={i} size="sm" active={isTested}>
                        {k}
                      </KbdKey>
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono-code truncate max-w-[140px]">
                    {item.action}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
