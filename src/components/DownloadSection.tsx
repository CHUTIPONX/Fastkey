import React, { useState } from 'react';
import { Language, translations } from '../locales';
import {
  Download,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Zap,
  FolderArchive,
  ArrowRight,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Lock,
  Play,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';

interface DownloadSectionProps {
  isDark: boolean;
  lang?: Language;
  onNavigateToDocs: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  isDark,
  lang = 'th',
  onNavigateToDocs,
}) => {
  const [copiedSha, setCopiedSha] = useState(false);
  const t = translations[lang];

  // Actual Google Drive link
  const googleDriveUrl =
    'https://drive.google.com/drive/u/0/folders/1PufiPZax-6bnuSh7OF5qrux7Cc6sdXtF';
  const virusTotalUrl =
    'https://www.virustotal.com/gui/file/4bf4af9afe65dbd3e15ff48c3ec4c9b8c89fda89a13945f6807a45ed774ee275?nocache=1';

  const sha256 = '4bf4af9afe65dbd3e15ff48c3ec4c9b8c89fda89a13945f6807a45ed774ee275';

  const handleCopySha = () => {
    navigator.clipboard.writeText(sha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      {/* 1. Hero & Welcome Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono-code font-bold shadow-sm ${isDark ? 'border-white/20 bg-white/5 text-zinc-200' : 'border-zinc-300 bg-zinc-100 text-zinc-700'}`}>
          <span>{t.download.badge}</span>
        </div>

        <h1
          className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}
        >
          {t.download.title}
        </h1>

        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-zinc-300' : 'text-zinc-600'
          }`}
        >
          {t.download.subtitle}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => window.location.assign('https://github.com/CHUTIPONX/Fastkey/raw/refs/heads/main/public/FastKey.exe')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black font-extrabold text-base shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-zinc-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            <span>{t.download.directDownloadBtn}</span>
          </button>

          <button
            onClick={onNavigateToDocs}
            className={`w-full sm:w-auto px-6 py-4 rounded-2xl border font-bold text-base transition-all flex items-center justify-center gap-2.5 ${
              isDark
                ? 'border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 hover:text-white'
                : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            <span>{t.hero.docsBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs font-mono-code text-zinc-400">
          {t.download.filePlatform} • {t.download.fileSize}
        </div>
      </div>

      <section className={`flex items-start gap-4 rounded-2xl border p-5 ${isDark ? 'border-amber-400/30 bg-amber-400/10' : 'border-amber-300 bg-amber-50'}`} role="alert">
        <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-400" />
        <div>
          <h2 className={`font-display text-base font-bold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
            {lang === 'th' ? 'คำเตือนสำคัญ: ห้ามลบไฟล์ข้อมูล' : 'Important: Do not delete data files'}
          </h2>
          <p className={`mt-1 text-sm leading-relaxed ${isDark ? 'text-amber-100/80' : 'text-amber-800'}`}>
            {lang === 'th'
              ? 'ห้ามลบไฟล์ data.ini และ profiles_master.ini เพราะเป็นไฟล์ข้อมูลที่จำเป็นต่อการทำงานของโปรแกรม'
              : 'Do not delete data.ini or profiles_master.ini. These data files are required for the program to work correctly.'}
          </p>
        </div>
      </section>

      {/* 2. Download File Cards (Clear, Big, Simple) */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border ${
          isDark
            ? 'bg-[#0E0E12] border-zinc-800 shadow-2xl'
            : 'bg-white border-zinc-200 shadow-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80 mb-6">
          <div>
            <h2
              className={`font-display text-xl sm:text-2xl font-bold ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {t.download.title}
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.download.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.download.virusTotalScore}</span>
            </span>
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {/* Main App Standalone EXE */}
          <div
            className={`flex h-full min-h-[330px] flex-col rounded-2xl border p-5 transition-all ${
              isDark
                ? 'bg-[#15151B] border-white/20 shadow-lg'
                : 'bg-zinc-50 border-zinc-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center shadow-md">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <div
                    className={`font-bold text-base ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {t.download.fileName}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono-code">
                    {t.download.fileSize} • {t.download.filePlatform}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded font-bold ${isDark ? 'bg-white/10 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                {t.download.portableTag}
              </span>
            </div>

            <p className={`text-xs leading-relaxed mb-5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {lang === 'th'
                ? 'ไฟล์โปรแกรม FastKey.exe ตัวเต็ม รันได้ทันทีโดยไม่ต้องติดตั้ง และไม่ต้องแตกไฟล์'
                : 'Complete standalone FastKey.exe executable. No setup and no extraction required.'}
            </p>

            <button
              type="button"
              onClick={() => window.location.assign('/FastKey.exe')}
              className="w-full mt-auto py-3 px-4 rounded-xl bg-white text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-zinc-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t.download.directDownloadBtn}</span>
            </button>
          </div>

          {/* Video Guide (Google Drive Video File) */}
          <div
            className={`flex h-full min-h-[330px] flex-col rounded-2xl border p-5 transition-all ${
              isDark
                ? 'bg-[#121217] border-zinc-800'
                : 'bg-zinc-50 border-zinc-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-200 flex items-center justify-center shadow-md">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <div
                    className={`font-bold text-base ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {lang === 'th' ? 'วิดีโอคู่มือสอนใช้งาน' : 'Video Tutorial Guide'}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono-code">
                    MP4 Video • Google Drive
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded font-bold ${isDark ? 'bg-white/10 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                Video Guide
              </span>
            </div>

            <p className={`text-xs leading-relaxed mb-5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {lang === 'th'
                ? 'ไฟล์วิดีโอสาธิตการใช้งานจริงทุกขั้นตอน ดูออนไลน์หรือดาวน์โหลดจาก Google Drive ได้ทันที'
                : 'Step-by-step video demonstration guide stored in Google Drive.'}
            </p>

            <a
              href={googleDriveUrl}
              target="_blank"
              rel="noreferrer"
              className={`w-full mt-auto py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                isDark
                  ? 'border-zinc-700 bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700 hover:text-white'
                  : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'th' ? 'เปิดดูวิดีโอบน Google Drive' : 'Watch Video on Google Drive'}</span>
            </a>
          </div>

          {/* User Manual PDF */}
          <div
            className={`flex h-full min-h-[330px] flex-col rounded-2xl border p-5 transition-all ${
              isDark
                ? 'bg-[#121217] border-zinc-800'
                : 'bg-zinc-50 border-zinc-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-200 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div
                    className={`font-bold text-base ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {t.download.pdfName}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono-code">
                    {t.download.pdfSize} • Document PDF
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                PDF Guide
              </span>
            </div>

            <p className={`text-xs leading-relaxed mb-5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {lang === 'th'
                ? 'เอกสารคู่มือการใช้งานรูปแบบ PDF อธิบายขั้นตอนการใช้งาน สามารถเปิดดูแบบออฟไลน์ได้'
                : 'Offline PDF documentation manual with step-by-step instructions.'}
            </p>

            <a
              href={googleDriveUrl}
              target="_blank"
              rel="noreferrer"
              className={`w-full mt-auto py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                isDark
                  ? 'border-zinc-700 bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700 hover:text-white'
                  : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{t.download.pdfDownloadBtn}</span>
            </a>
          </div>
        </div>

        {/* Security / VirusTotal Notice Box */}
        <div className={`mt-6 p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isDark ? 'bg-black/40 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
          <div className="flex items-center gap-3">
            <ShieldCheck className={`w-5 h-5 shrink-0 ${isDark ? 'text-white' : 'text-zinc-700'}`} />
            <div className={`text-xs leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>{t.download.securityBadge}:</span>{' '}
              {t.download.securityDesc}
            </div>
          </div>

          <a
            href={virusTotalUrl}
            target="_blank"
            rel="noreferrer"
            className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-mono-code underline ${isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'}`}
          >
            <span>{t.download.viewVirusTotal}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3. Quick Start 3 Steps (Super Easy to Understand) */}
      <div className="space-y-6">
        <div className="text-center">
          <h2
            className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            {t.quickStart.title}
          </h2>
          <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.quickStart.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0E0E12] border-zinc-800 hover:border-zinc-700'
                : 'bg-white border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center mb-4 text-sm shadow-md">
              1
            </div>
            <h3
              className={`font-display text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {t.quickStart.step1Title}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {t.quickStart.step1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0E0E12] border-zinc-800 hover:border-zinc-700'
                : 'bg-white border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center mb-4 text-sm shadow-md">
              2
            </div>
            <h3
              className={`font-display text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {t.quickStart.step2Title}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {t.quickStart.step2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0E0E12] border-zinc-800 hover:border-zinc-700'
                : 'bg-white border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center mb-4 text-sm shadow-md">
              3
            </div>
            <h3
              className={`font-display text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {t.quickStart.step3Title}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {t.quickStart.step3Desc}
            </p>
          </div>
        </div>

        {/* CTA to view full docs */}
        <div className="text-center pt-4">
          <button
            onClick={onNavigateToDocs}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold text-white transition-all shadow-sm group"
          >
            <BookOpen className="w-4 h-4 text-white" />
            <span>{lang === 'th' ? 'คลิกที่นี่เพื่อเปิดดูคู่มือการตั้งค่าแบบละเอียด' : 'Open Detailed Documentation Guide'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
