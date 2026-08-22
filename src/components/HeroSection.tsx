import React, { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton';
import { CardTilt } from './CardTilt';
import { KbdKey } from './KbdKey';
import {
  Terminal,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  FileCode,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { NavigationTab } from '../types';
import { Language, translations } from '../locales';

interface HeroSectionProps {
  onNavigate: (tab: NavigationTab) => void;
  isDark: boolean;
  onOpenCommandPalette: () => void;
  lang?: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  isDark,
  onOpenCommandPalette,
  lang = 'th',
}) => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'git' | 'snippet' | 'profile' | 'macro'>('git');
  const [interactiveLog, setInteractiveLog] = useState<string[]>([]);
  const [interactiveCount, setInteractiveCount] = useState(1);
  const [mouseGlow, setMouseGlow] = useState({ x: 0, y: 0 });

  const t = translations[lang].hero;
  const virusTotalUrl = 'https://www.virustotal.com/gui/file/6ae4fedef470f68b6fc0850979b014d7f00922000c6ea617cfe3e0bfa67db5e0?nocache=1';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const executeDemoCommand = (command: string, desc: string) => {
    const time = new Date().toLocaleTimeString();
    setInteractiveLog((prev) => [
      `[${time}] → ${command} (${desc})`,
      ...prev.slice(0, 4),
    ]);
    setInteractiveCount((c) => c + 1);
  };

  useEffect(() => {
    // Initial demo log
    setInteractiveLog([
      `[FastKey Core v2.4] ${t.daemonReady}`,
      `[Global Hook] ${t.hookBound}`,
    ]);
  }, [lang]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 md:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        {/* 1. Sequence Step 1: Badge */}
        <div className="reveal-seq mb-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono-code font-semibold text-zinc-200 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_#ffffff]"></span>
          </span>
          <span>{t.badgeLive}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-white flex items-center gap-1 font-mono">
            <Zap className="w-3 h-3 inline text-white" /> {t.badgeLatency}
          </span>
        </div>

        {/* 2. Sequence Step 2: Main Heading */}
        <h1
          id="hero-heading"
          className={`
            font-display font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.12] mb-6
            text-3xl sm:text-5xl md:text-6xl lg:text-[68px]
            ${isDark ? 'text-white glow-text-white' : 'text-zinc-950'}
            transition-all duration-300
          `}
          style={{
            textShadow: isDark
              ? `0 0 25px rgba(255,255,255,0.25), 0 0 ${Math.abs(mouseGlow.x - 50) * 0.4 + 10}px rgba(255,255,255,0.15)`
              : 'none',
          }}
        >
          {t.heading}
        </h1>

        {/* 3. Sequence Step 3: Description */}
        <p
          className={`
            font-body text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-9 font-normal leading-relaxed
            ${isDark ? 'text-zinc-300' : 'text-zinc-600'}
          `}
          style={{
            animation: 'revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards',
          }}
        >
          {t.description}
        </p>

        {/* 4. Sequence Step 4: Magnetic Action Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8"
          style={{
            animation: 'revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards',
          }}
        >
          <MagneticButton
            isDownload={true}
            downloadFileName="FastKey-v2.4.0-Setup.exe"
            variant="primary"
            isDark={isDark}
            className="px-8 py-3.5 text-base w-full sm:w-auto"
          >
            {t.downloadBtn}
          </MagneticButton>

          <MagneticButton
            onClick={() => onNavigate('docs')}
            variant="secondary"
            isDark={isDark}
            className="px-7 py-3.5 text-base w-full sm:w-auto"
          >
            <span>{t.docsBtn}</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </MagneticButton>

          <button
            onClick={onOpenCommandPalette}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono-code transition-all w-full sm:w-auto justify-center
              ${isDark ? 'bg-[#141418] text-zinc-400 border border-[#26262A] hover:text-white hover:border-white/30' : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:text-black hover:border-black/30'}
            `}
          >
            <span>{t.sandboxBtn}</span>
            <div className="flex items-center gap-1">
              <KbdKey size="sm">Ctrl</KbdKey>
              <KbdKey size="sm">K</KbdKey>
            </div>
          </button>
        </div>

        {/* 4.5 Security & Video Guide Badges on Hero */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('docs')}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-xs font-mono-code text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] group"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="font-bold">{lang === 'th' ? '🎥 ดูวิดีโอ & คู่มือแกะขั้นตอน 6 สเต็ป' : '🎥 Watch Video & 6-Step Visual Guide'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={virusTotalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono-code text-zinc-200 transition-all shadow-[0_0_12px_rgba(255,255,255,0.06)] group"
          >
            <ShieldCheck className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{lang === 'th' ? 'VirusTotal 0/72 Clean' : 'VirusTotal 0/72 Clean'}</span>
            <ExternalLink className="w-3 h-3 text-zinc-400 ml-0.5 opacity-70" />
          </a>
        </div>

        {/* 5. Sequence Step 5: Interactive Terminal & Floating Dock Preview with 3D Tilt */}
        <div
          className="w-full max-w-4xl mx-auto"
          style={{
            animation: 'revealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards',
          }}
        >
          <CardTilt isDark={isDark} maxTilt={2.5}>
            <div className="p-4 sm:p-6 text-left">
              {/* Window Titlebar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#26262B] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-600 border border-zinc-500"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-500 border border-zinc-400"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-400 border border-zinc-300"></div>
                  <span className="ml-2 text-xs font-mono-code text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-zinc-300" /> fastkey-runtime-daemon.sh
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-code">
                  <span className="hidden sm:inline">{t.globalTrigger}</span>
                  <div className="flex items-center gap-1">
                    <KbdKey size="sm">Ctrl</KbdKey>
                    <KbdKey size="sm">Space</KbdKey>
                  </div>
                </div>
              </div>

              {/* Interactive Workflow Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <button
                  onClick={() => {
                    setActiveWorkflowTab('git');
                    executeDemoCommand('git commit & push', 'Automated git branch push');
                  }}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all
                    ${activeWorkflowTab === 'git'
                      ? (isDark ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'bg-black text-white font-bold')
                      : (isDark ? 'bg-[#18181E] text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-600')
                    }
                  `}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{t.gitFlow}</span>
                  <KbdKey size="sm" className="ml-1">1</KbdKey>
                </button>

                <button
                  onClick={() => {
                    setActiveWorkflowTab('snippet');
                    executeDemoCommand('insert snippet: ReactHook', 'Template expansion');
                  }}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all
                    ${activeWorkflowTab === 'snippet'
                      ? (isDark ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'bg-black text-white font-bold')
                      : (isDark ? 'bg-[#18181E] text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-600')
                    }
                  `}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{t.snippets}</span>
                  <KbdKey size="sm" className="ml-1">2</KbdKey>
                </button>

                <button
                  onClick={() => {
                    setActiveWorkflowTab('profile');
                    executeDemoCommand('switch_env: STAGING_AWS_VPC', 'Environment swap');
                  }}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all
                    ${activeWorkflowTab === 'profile'
                      ? (isDark ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'bg-black text-white font-bold')
                      : (isDark ? 'bg-[#18181E] text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-600')
                    }
                  `}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t.envSwitch}</span>
                  <KbdKey size="sm" className="ml-1">3</KbdKey>
                </button>

                <button
                  onClick={() => {
                    setActiveWorkflowTab('macro');
                    executeDemoCommand('run_macro: CleanBuildTest', '3-step pipeline sequence');
                  }}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all
                    ${activeWorkflowTab === 'macro'
                      ? (isDark ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'bg-black text-white font-bold')
                      : (isDark ? 'bg-[#18181E] text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-600')
                    }
                  `}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{t.macro}</span>
                  <KbdKey size="sm" className="ml-1">4</KbdKey>
                </button>
              </div>

              {/* Code output & Execution stream */}
              <div
                className={`
                  p-4 rounded-xl font-mono-code text-xs leading-relaxed overflow-x-auto min-h-[140px] flex flex-col justify-between
                  ${isDark ? 'bg-[#0B0B0E] border border-[#1F1F24] text-zinc-200' : 'bg-zinc-900 border border-zinc-800 text-zinc-200'}
                `}
              >
                <div>
                  <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2 mb-2">
                    <span className="text-white flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_#ffffff]"></span>
                      fastkey-core: active process pid #{2840 + interactiveCount}
                    </span>
                    <span>Memory: 4.8MB • CPU: 0.02%</span>
                  </div>

                  <div className="space-y-1">
                    {interactiveLog.map((log, i) => (
                      <div
                        key={i}
                        className={`transition-all ${
                          i === 0 ? 'text-white font-bold' : 'text-zinc-400'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" /> {t.nativeHookEngine}
                  </span>
                  <span className="text-zinc-500">{t.clickTabsHint}</span>
                </div>
              </div>

              {/* Feature summary row */}
              <div className="mt-4 pt-3 border-t border-[#26262B] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Cpu className="w-4 h-4 text-zinc-300" />
                  <span>{t.ultraLight}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-zinc-300" />
                  <span>{t.offlinePrivate}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Zap className="w-4 h-4 text-zinc-300" />
                  <span>{t.zeroDelayFuzzy}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Sparkles className="w-4 h-4 text-zinc-300" />
                  <span>{t.crossPlatform}</span>
                </div>
              </div>
            </div>
          </CardTilt>
        </div>
      </div>
    </section>
  );
};
