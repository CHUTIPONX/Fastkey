import React, { useState } from 'react';
import { CardTilt } from './CardTilt';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, Bug, ExternalLink } from 'lucide-react';
import { Language, translations } from '../locales';

interface ChangelogSectionProps {
  isDark: boolean;
  onDownloadClick: () => void;
  lang?: Language;
}

export const ChangelogSection: React.FC<ChangelogSectionProps> = ({
  isDark,
  onDownloadClick,
  lang = 'th',
}) => {
  const t = translations[lang].changelog;
  const virusTotalUrl = 'https://www.virustotal.com/gui/file/6ae4fedef470f68b6fc0850979b014d7f00922000c6ea617cfe3e0bfa67db5e0?nocache=1';

  const releases = [
    {
      version: 'v2.4.0',
      tag: 'Latest Production Release',
      date: 'May 2026',
      badgeColor: 'bg-[#00FF41]/15 text-[#00FF41] border-[#00FF41]/30',
      title: lang === 'th' ? 'Zero-Delay Fuzzy Engine & การรับรอง VirusTotal' : 'Zero-Delay Fuzzy Engine & VirusTotal Verification',
      highlights: lang === 'th' ? [
        'ระบบค้นหา Fuzzy Search เวอร์ชั่นใหม่ ตอบสนองไวขึ้น 40% (ต่ำกว่า 0.12ms)',
        'ผ่านการรับรองความปลอดภัย 100% บน VirusTotal (0/72 detections สะอาดหมดจด)',
        'รองรับภาษาไทยเต็มรูปแบบ (Full Thai Localization & UX)',
        'เพิ่มฟังก์ชัน Auto Send ส่งคีย์บอร์ดมาโครไปยัง Terminal เบื้องหลัง',
        'ลดการใช้ Memory เหลือเพียง 4.6MB บน Windows / macOS / Linux',
      ] : [
        'Brand new native fuzzy matcher engine: 40% faster execution (<0.12ms)',
        'VirusTotal 100% clean certification audit (0/72 Detections)',
        'Full Thai Localization & bilingual toggle switch',
        'Added background window Auto Send keystroke dispatcher',
        'Reduced idle memory footprint down to 4.6MB',
      ],
      fixes: lang === 'th' ? [
        'แก้ไขการตรวจจับ modifier keys ซ้อนกันใน macOS Sequoia',
        'แก้ไขปัญหา multi-monitor DPI scaling บน Windows 11',
      ] : [
        'Fixed modifier key ghosting during fast typing on macOS Sequoia',
        'Resolved multi-monitor DPI fractional scaling offset on Windows 11',
      ],
    },
    {
      version: 'v2.3.2',
      tag: 'Stable Patch',
      date: 'April 2026',
      badgeColor: 'bg-white/10 text-gray-300 border-white/15',
      title: lang === 'th' ? 'Clipboard Manager & Snippet Macro Pipeline' : 'Clipboard Manager & Snippet Macro Pipeline',
      highlights: lang === 'th' ? [
        'ระบบ Smart Clipboard History จัดเก็บในเครื่องแบบเข้ารหัส AES-256',
        'รองรับ Snippet Expander ด้วย Dynamic Template Variables',
      ] : [
        'Local SQLite clipboard history vault with AES-256 encryption',
        'Dynamic regex snippet expansion system',
      ],
      fixes: lang === 'th' ? [
        'ปรับปรุงการใช้ CPU ขณะ Standby ใน Linux Wayland',
      ] : [
        'Optimized Wayland input bridge CPU wakeups',
      ],
    },
  ];

  return (
    <section id="changelog" className="py-24 px-4 md:px-8 max-w-[1100px] mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono-code text-zinc-200 mb-4 font-semibold shadow-[0_0_12px_rgba(255,255,255,0.1)]">
          <Sparkles className="w-3.5 h-3.5 text-white" /> {t.badge}
        </div>
        <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          {t.title}
        </h2>
        <p className={`text-base md:text-lg ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
          {t.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        {releases.map((rel) => (
          <CardTilt key={rel.version} isDark={isDark} maxTilt={2}>
            <div className="p-6 sm:p-8 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-2xl font-bold text-white">{rel.version}</span>
                    <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-zinc-200">
                      {rel.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-200">{rel.title}</h3>
                </div>
                <div className="text-xs font-mono-code text-zinc-400 sm:text-right">
                  <div>{rel.date}</div>
                  <a
                    href={virusTotalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-300 hover:text-white flex items-center gap-1 mt-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-white" /> 0/72 Clean <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-zinc-300 mb-3">
                  {lang === 'th' ? '✨ ฟีเจอร์และการปรับปรุงใหม่' : '✨ New Features & Improvements'}
                </div>
                <div className="space-y-2.5">
                  {rel.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixes */}
              {rel.fixes && rel.fixes.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    {lang === 'th' ? '🛠️ แก้ไขข้อผิดพลาด (Bug Fixes)' : '🛠️ Bug Fixes'}
                  </div>
                  <div className="space-y-1.5">
                    {rel.fixes.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                        <Bug className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardTilt>
        ))}
      </div>
    </section>
  );
};
