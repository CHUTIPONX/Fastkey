import React from 'react';
import { CardTilt } from './CardTilt';
import { MagneticButton } from './MagneticButton';
import { Check, Zap, Sparkles, Terminal, Shield, ArrowRight } from 'lucide-react';
import { Language, translations } from '../locales';

interface PricingSectionProps {
  isDark: boolean;
  onDownloadClick: () => void;
  lang?: Language;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  isDark,
  onDownloadClick,
  lang = 'th',
}) => {
  const t = translations[lang].pricing;

  const tiers = [
    {
      name: lang === 'th' ? 'Community (ฟรี)' : 'Community',
      price: '$0',
      period: t.freeForever,
      description: lang === 'th' ? 'ขุมพลังคีย์บอร์ดความเร็วสูงเต็มรูปแบบ สำหรับนักพัฒนาทั่วไปและชุมชน Open-source' : 'The full keyboard core for individual developers and open-source contributors.',
      badge: 'Open Source',
      highlight: false,
      features: lang === 'th' ? [
        'Global Command Dock & Hotkey Engine',
        '0.12ms Native C++ & Rust Hook runtime',
        'ระบบค้นหา Fuzzy search & รันคำสั่ง Terminal',
        'สร้าง Workspace ได้สูงสุด 5 โปรไฟล์',
        'ประวัติคลิปบอร์ดในเครื่อง (100 รายการ)',
        'ทำงานออฟไลน์ 100% ไร้การเก็บข้อมูล',
      ] : [
        'Global Command Dock & Hotkey Engine',
        '0.12ms Zero Latency C++ Hook runtime',
        'Fuzzy search & terminal execution',
        'Up to 5 custom workspace profiles',
        'Local clipboard history (100 items)',
        '100% Offline & Zero Telemetry',
      ],
      cta: t.downloadFree,
      isDownload: true,
    },
    {
      name: lang === 'th' ? 'Pro Lifetime' : 'Pro Lifetime',
      price: '$29',
      period: t.oneTime,
      description: lang === 'th' ? 'ปลดล็อกขีดจำกัดสำหรับนักพัฒนาซอฟต์แวร์และ Content Creator ระดับโปร' : 'Unlimited power for high-output software engineers and creators.',
      badge: 'Most Popular',
      highlight: true,
      features: lang === 'th' ? [
        'ทุกฟีเจอร์ใน Community tier',
        'ไม่จำกัดจำนวน Workspace & Macro pipelines',
        'Auto Send ส่งคีย์ลัดไปยังโปรแกรมเบื้องหลัง',
        'TypeScript / Lua extension plugin SDK',
        'AES-256 เข้ารหัสไฟล์ Config vault',
        'อัปเดตฟรีตลอดชีพ & ช่องทางสนับสนุนพิเศษ',
      ] : [
        'Everything in Community tier',
        'Unlimited custom profiles & macro pipelines',
        'Auto Send to background window tabs',
        'TypeScript / Lua extension plugin SDK',
        'AES-256 encrypted configuration vaults',
        'Lifetime updates & priority issue tracker',
      ],
      cta: t.getPro,
      isDownload: false,
    },
    {
      name: lang === 'th' ? 'Team / Enterprise' : 'Team / Enterprise',
      price: '$9',
      period: t.perSeatMonth,
      description: lang === 'th' ? 'แชร์ชุดปุ่มลัดและ Snippet ร่วมกันในทีม พร้อมการจัดการแบบรวมศูนย์' : 'Shared engineering shortcuts, company snippet libraries, and centralized configs.',
      badge: 'Organizations',
      highlight: false,
      features: lang === 'th' ? [
        'ทุกฟีเจอร์ใน Pro tier',
        'แชร์ Git-backed repository สำหรับคีย์ลัดของทีม',
        'สร้าง Preset สำหรับ Onboarding พนักงานใหม่',
        'รองรับ SAML / SSO & MDM binary deployment',
        'Dedicated SLA & Custom hook engineering',
      ] : [
        'Everything in Pro tier',
        'Shared Git-backed company keymap repo',
        'Centralized developer onboarding presets',
        'SAML / SSO & MDM binary deployment',
        'Dedicated SLA & custom hook engineering',
      ],
      cta: t.contactSales,
      isDownload: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 md:px-8 max-w-[1240px] mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono-code text-zinc-200 mb-4 font-semibold shadow-[0_0_12px_rgba(255,255,255,0.1)]">
          <Zap className="w-3.5 h-3.5 text-white" /> {t.badge}
        </div>
        <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          {t.title}
        </h2>
        <p className={`text-base md:text-lg ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {tiers.map((tier) => (
          <div key={tier.name} className="h-full">
            <CardTilt
              isDark={isDark}
              maxTilt={3}
              glowColor={tier.highlight ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)'}
              className={`h-full ${tier.highlight ? 'border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.15)]' : ''}`}
            >
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xl font-bold text-white">{tier.name}</span>
                    <span
                      className={`
                        text-xs font-mono-code font-bold px-2.5 py-1 rounded-full
                        ${tier.highlight
                          ? 'bg-white text-black shadow-[0_0_10px_#ffffff]'
                          : 'bg-white/5 border border-white/10 text-zinc-300'
                        }
                      `}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-white">{tier.price}</span>
                    <span className="text-xs font-mono-code text-zinc-400">{tier.period}</span>
                  </div>

                  <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <MagneticButton
                    isDownload={tier.isDownload}
                    onClick={tier.isDownload ? onDownloadClick : undefined}
                    variant={tier.highlight ? 'primary' : 'secondary'}
                    isDark={isDark}
                    className="w-full py-3.5 text-sm"
                  >
                    {tier.cta}
                  </MagneticButton>
                </div>
              </div>
            </CardTilt>
          </div>
        ))}
      </div>
    </section>
  );
};
