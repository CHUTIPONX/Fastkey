import React, { useState } from 'react';
import { VideoGuideSection } from './VideoGuideSection';
import { Language, translations } from '../locales';
import {
  BookOpen,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  FolderArchive,
  Terminal,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface DocsSectionProps {
  isDark: boolean;
  onOpenCommandPalette?: () => void;
  lang?: Language;
}

export const DocsSection: React.FC<DocsSectionProps> = ({
  isDark,
  lang = 'th',
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const t = translations[lang].docs;

  const virusTotalUrl =
    'https://www.virustotal.com/gui/file/6ae4fedef470f68b6fc0850979b014d7f00922000c6ea617cfe3e0bfa67db5e0?nocache=1';

  const faqs = [
    {
      q: lang === 'th' ? 'ทำไม Windows SmartScreen ถึงขึ้นเตือนหน้าต่างสีน้ำเงิน?' : 'Why does Windows SmartScreen show a blue advisory?',
      a: lang === 'th'
        ? 'เนื่องจากโปรแกรม GodkeyX1 เป็นโปรแกรมแบบ Standalone พกพาขนาดเล็กที่ไม่ได้ซื้อใบรับรองดิจิทัลแบบองค์กรจาก Microsoft ระบบจึงแจ้งเตือนเป็นปกติ คุณสามารถกด "More info" แล้วเลือก "Run anyway" เพื่อเปิดใช้งานได้อย่างปลอดภัย 100% (ผ่านการตรวจ VirusTotal 72 ค่าย ไม่มีไวรัส)'
        : 'GodkeyX1 is a lightweight standalone utility without a costly enterprise signing certificate. Simply click "More info" then "Run anyway". It is 100% safe with 0/72 detections on VirusTotal.',
    },
    {
      q: lang === 'th' ? 'ปุ่ม "ส่งออโต้" ทำงานอย่างไร?' : 'How does the "Auto-Send" toggle work?',
      a: lang === 'th'
        ? 'เมื่อเปิดใช้งาน "ส่งออโต้" เมื่อคุณพิมพ์คีย์ลัด โปรแกรมจะพิมพ์ข้อความลงในช่องแชทและกดปุ่ม Enter ให้ทันทีโดยอัตโนมัติ หากปิดไว้ โปรแกรมจะแค่วางข้อความให้คุณตรวจสอบก่อนกดส่งเอง'
        : 'When enabled, typing a hotkey expands your message and automatically presses Enter to send immediately. When disabled, it pastes the text for your review.',
    },
    {
      q: lang === 'th' ? 'การตั้งค่า "เว็บไซต์ที่อนุญาต" มีประโยชน์อย่างไร?' : 'What is the "Allowed Websites" whitelist for?',
      a: lang === 'th'
        ? 'ช่วยป้องกันไม่ให้คีย์ลัดทำงานผิดหน้าต่าง โดยโปรแกรมจะทำงานเฉพาะเมื่อชื่อหัวข้อหน้าต่างเว็บ (Window Title) ตรงกับคีย์เวิร์ดที่คุณระบุไว้ เช่น myorder, pancake, deeple, page365, zortout เท่านั้น'
        : 'It ensures hotkeys only fire inside approved web tabs or applications (e.g. CRM / Chat tools), preventing unintended expansions elsewhere.',
    },
    {
      q: lang === 'th' ? 'โปรแกรมต้องต่ออินเทอร์เน็ตหรือไม่ และปลอดภัยต่อข้อมูลหรือไม่?' : 'Does it require an internet connection, and is it secure?',
      a: lang === 'th'
        ? 'ไม่ต้องต่ออินเทอร์เน็ต โปรแกรมทำงานแบบ Offline 100% ข้อมูลคีย์ลัดและข้อความทั้งหมดจะถูกบันทึกไว้ในเครื่องของคุณเองเท่านั้น ไม่มีการส่งข้อมูลใดๆ ออกนอกเครื่อง'
        : 'It works 100% offline. All hotkeys and templates are stored locally on your machine with zero external data telemetry.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono-code font-bold text-zinc-200 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h1
          className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}
        >
          {t.title}
        </h1>
        <p className={`text-sm sm:text-base ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* 1. Visual Interactive Step-by-Step Guide & Simulator (Main Feature) */}
      <VideoGuideSection isDark={isDark} lang={lang} />

      {/* 2. Frequently Asked Questions (FAQ) - Simple & Clear */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border ${
          isDark ? 'bg-[#0E0E12] border-zinc-800' : 'bg-white border-zinc-200'
        } shadow-xl space-y-6`}
      >
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
          <Sliders className="w-6 h-6 text-red-400" />
          <div>
            <h2 className={`font-display text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              {lang === 'th' ? 'การจัดการโปรไฟล์ในโปรแกรม' : 'Managing profiles in the app'}
            </h2>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {lang === 'th' ? 'โปรไฟล์ใช้เก็บชุดคีย์ลัดและข้อความหลายชุดสำหรับแต่ละงาน' : 'Profiles store hotkeys and multiple message sets for each workflow.'}
            </p>
          </div>
        </div>
        <ol className={`grid gap-3 text-sm leading-relaxed sm:grid-cols-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {(lang === 'th' ? [
            'เลือกโปรไฟล์จากช่อง “โปรไฟล์” เช่น Admin-work หรือ Sales-team',
            'กด “เพิ่ม” เพื่อสร้างโปรไฟล์ใหม่ หรือ “แก้ชื่อ” เพื่อเปลี่ยนชื่อโปรไฟล์',
            'พิมพ์คีย์ลัดที่ต้องการ เช่น ww, 33 หรือ กป',
            'ใส่ข้อความชุดที่ 1, 2 และ 3 เพื่อให้คีย์ลัดเดียวเลือกใช้ข้อความได้หลายแบบ',
            'กด “เพิ่ม” เพื่อเพิ่มแถวใหม่ หรือเลือกแถวในตารางเพื่อแก้ไขข้อมูลเดิม',
            'ใช้ช่องค้นหาข้อมูลเพื่อค้นหาคีย์ลัดหรือข้อความในโปรไฟล์',
            'เปิด “ส่งออโต้” หากต้องการให้โปรแกรมส่งข้อความทันทีหลังเรียกใช้คีย์ลัด',
            'กด “บันทึก” ทุกครั้งหลังแก้ไข และลบโปรไฟล์ได้จากปุ่ม “ลบ”',
          ] : [
            'Select a profile such as Admin-work or Sales-team.',
            'Use Add to create a profile or Rename to change its name.',
            'Enter a hotkey such as ww, 33, or a Thai shortcut.',
            'Fill message sets 1, 2, and 3 to keep multiple responses on one hotkey.',
            'Use Add for a new row, or select a table row to edit it.',
            'Search hotkeys and messages with the search field.',
            'Enable Auto-send to send the message immediately after using a hotkey.',
            'Click Save after changes. Delete removes the selected profile.',
          ]).map((step, index) => (
            <li key={step} className="flex gap-3 rounded-xl border border-zinc-800/70 p-3">
              <span className="font-mono-code font-bold text-red-400">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 3. Frequently Asked Questions (FAQ) - Simple & Clear */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border ${
          isDark ? 'bg-[#0E0E12] border-zinc-800' : 'bg-white border-zinc-200'
        } shadow-xl space-y-6`}
      >
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
          <HelpCircle className="w-6 h-6 text-white" />
          <div>
            <h2
              className={`font-display text-lg sm:text-xl font-bold ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {lang === 'th' ? 'คำถามที่พบบ่อย (FAQ)' : 'Frequently Asked Questions'}
            </h2>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {lang === 'th'
                ? 'ข้อสงสัยยอดนิยมเกี่ยวกับการใช้งานและความปลอดภัย'
                : 'Common questions regarding usage and system security'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#15151B] border-zinc-800'
                    : 'bg-zinc-50 border-zinc-200'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base focus:outline-none"
                >
                  <span className={isDark ? 'text-white' : 'text-zinc-900'}>
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div
                    className={`px-4 pb-4 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                      isDark
                        ? 'border-zinc-800 text-zinc-300'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* VirusTotal Verification Callout */}
        <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {lang === 'th'
                ? 'ไฟล์โปรแกรมได้รับการตรวจสอบและรับรองความปลอดภัย 100% ผ่าน VirusTotal (0/72 Clean)'
                : 'Software binary verified 100% clean & secure by VirusTotal (0/72 Clean)'}
            </span>
          </div>
          <a
            href={virusTotalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline flex items-center gap-1 font-mono-code font-bold"
          >
            <span>{lang === 'th' ? 'ตรวจรายงาน VirusTotal' : 'View Report'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
