export type Language = 'th' | 'en';

export interface Translations {
  nav: {
    home: string;
    features: string;
    docs: string;
    pricing: string;
    changelog: string;
    download: string;
    langToggle: string;
    quickDownload: string;
  };
  hero: {
    badgeLive: string;
    badgeLatency: string;
    heading: string;
    description: string;
    downloadBtn: string;
    docsBtn: string;
    sandboxBtn: string;
    daemonReady: string;
    hookBound: string;
    globalTrigger: string;
    gitFlow: string;
    snippets: string;
    envSwitch: string;
    macro: string;
    nativeHookEngine: string;
    clickTabsHint: string;
    ultraLight: string;
    offlinePrivate: string;
    zeroDelayFuzzy: string;
    crossPlatform: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    dock: { tag: string; title: string; desc: string };
    autoSend: { tag: string; title: string; desc: string };
    profiles: { tag: string; title: string; desc: string };
    clipboard: { tag: string; title: string; desc: string };
    sdk: { tag: string; title: string; desc: string };
    fuzzy: { tag: string; title: string; desc: string };
    interactiveTester: string;
    pressKeyPrompt: string;
    detectedKey: string;
    viewAllShortcuts: string;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    freeForever: string;
    oneTime: string;
    perSeatMonth: string;
    downloadFree: string;
    getPro: string;
    contactSales: string;
    buyPro: string;
    guarantee: string;
  };
  changelog: {
    badge: string;
    title: string;
    subtitle: string;
    viewFullGithub: string;
  };
  download: {
    badge: string;
    title: string;
    subtitle: string;
    fileName: string;
    fileSize: string;
    filePlatform: string;
    pdfName: string;
    pdfSize: string;
    directDownloadBtn: string;
    pdfDownloadBtn: string;
    securityBadge: string;
    securityDesc: string;
    virusTotalScore: string;
    viewVirusTotal: string;
    portableTag: string;
  };
  quickStart: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  docs: {
    badge: string;
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    securityReport: string;
  };
}

export const translations: Record<Language, Translations> = {
  th: {
    nav: {
      home: 'หน้าแรก',
      features: 'ฟีเจอร์หลัก',
      docs: 'คู่มือการใช้งาน',
      pricing: 'ราคาและสิทธิ์การใช้งาน',
      changelog: 'อัปเดตเวอร์ชัน',
      download: 'ดาวน์โหลด',
      langToggle: 'TH / EN',
      quickDownload: 'ดาวน์โหลดฟรี',
    },
    hero: {
      badgeLive: 'FastKey v2.4.0 พร้อมใช้งาน',
      badgeLatency: 'Latency 0.12ms',
      heading: 'เครื่องมือคีย์ลัดและควบคุมเวิร์กโฟลว์ความเร็วสูง',
      description: 'สั่งการเครื่องมือ สลับโปรไฟล์ รันคำสั่ง และขยายเทมเพลตข้อความได้ในเสี้ยววินาทีด้วย Global Hotkey Engine ที่เบาและเร็วที่สุด',
      downloadBtn: 'ดาวน์โหลดสำหรับ Windows',
      docsBtn: 'คู่มือการใช้งาน',
      sandboxBtn: 'เปิด Command HUD',
      daemonReady: 'Daemon พร้อมทำงาน (PID #2841)',
      hookBound: 'ผูก Global Keyboard Hook สำเร็จ',
      globalTrigger: 'คีย์ลัดหลัก:',
      gitFlow: 'Git Automation',
      snippets: 'Code Snippets',
      envSwitch: 'สลับ Staging / Prod',
      macro: 'Macro Pipeline',
      nativeHookEngine: 'Native Hook Engine ความเร็ว 0.12ms',
      clickTabsHint: 'คลิกแท็บด้านบนเพื่อทดสอบการทำงาน',
      ultraLight: 'กินแรมเพียง 4.6 MB',
      offlinePrivate: 'ออฟไลน์ 100% ไร้การส่งข้อมูล',
      zeroDelayFuzzy: 'ค้นหาแบบ Fuzzy ไร้ดีเลย์',
      crossPlatform: 'รองรับ Windows 10/11',
    },
    features: {
      badge: 'ขุมพลังแห่งความเร็ว',
      title: 'ออกแบบมาเพื่อความเร็ว ไร้การสะดุด',
      subtitle: 'ควบคุมทุกอย่างผ่านปลายนิ้วโดยไม่ต้องยกมือออกจากคีย์บอร์ด',
      dock: {
        tag: 'Command HUD',
        title: 'Global HUD ค้นหาคำสั่งทันที',
        desc: 'เรียกหน้าต่างลอยขึ้นมาพิมพ์ค้นหาคำสั่ง รันสคริปต์ หรือเปิดโปรแกรมได้ทันใจด้วยการค้นหาแบบ Fuzzy',
      },
      autoSend: {
        tag: 'Auto-Send Macros',
        title: 'ระบบส่งคีย์อัตโนมัติ และแมโคร',
        desc: 'จัดลำดับการกดปุ่มหลายขั้นตอน เช่น สลับหน้าต่าง กรอกข้อมูล และกด Enter อัตโนมัติในคลิกเดียว',
      },
      profiles: {
        tag: 'Context Aware',
        title: 'ระบบโปรไฟล์แยกตามโปรแกรม',
        desc: 'สลับชุดคีย์ลัดโดยอัตโนมัติตามแอปพลิเคชันหรือหน้าต่างเว็บที่กำลังเปิดใช้งานอยู่',
      },
      clipboard: {
        tag: 'Snippet Engine',
        title: 'ขยายข้อความและเทมเพลตด่วน',
        desc: 'พิมพ์คีย์เวิร์ดสั้นๆ เพื่อแปลงเป็นโค้ดหรือข้อความตอบกลับยาวๆ พร้อมตัวแปรแบบไดนามิก',
      },
      sdk: {
        tag: 'Extensibility',
        title: 'เขียนปลั๊กอินด้วย TypeScript และ Lua',
        desc: 'ขยายความสามารถของโปรแกรมได้อย่างอิสระผ่าน Plugin API และ Webhook ภายในเครื่อง',
      },
      fuzzy: {
        tag: 'Security & Privacy',
        title: 'ปลอดภัย 100% ทำงานออฟไลน์',
        desc: 'ผ่านการรับรอง VirusTotal 0/72 Detections สะอาดหมดจด ข้อมูลทั้งหมดอยู่บนเครื่องของคุณเท่านั้น',
      },
      interactiveTester: 'ทดสอบการกดคีย์บอร์ดจริง',
      pressKeyPrompt: 'ลองกดปุ่มใดก็ได้บนคีย์บอร์ดจริงเพื่อดูการตรวจจับคีย์แบบเรียลไทม์',
      detectedKey: 'ตรวจจับคีย์:',
      viewAllShortcuts: 'ดูคีย์ลัดทั้งหมด',
    },
    pricing: {
      badge: 'ราคาและสิทธิ์การใช้งาน',
      title: 'เลือกแพ็กเกจที่เหมาะกับคุณ',
      subtitle: 'โปรแกรมใช้งานได้ฟรีอย่างสมบูรณ์แบบ หรืออัปเกรดเพื่อฟีเจอร์ระดับโปร',
      freeForever: 'ฟรีตลอดชีพ',
      oneTime: 'จ่ายครั้งเดียว',
      perSeatMonth: 'ต่อผู้ใช้ / เดือน',
      downloadFree: 'ดาวน์โหลดฟรีทันที',
      getPro: 'อัปเกรดเป็น Pro',
      contactSales: 'ติดต่อฝ่ายขาย',
      buyPro: 'อัปเกรดเป็น Pro',
      guarantee: 'การันตีคืนเงินภายใน 30 วัน • อัปเดตฟรีตลอดชีพ',
    },
    changelog: {
      badge: 'ประวัติการอัปเดต',
      title: 'บันทึกการเปลี่ยนแปลงล่าสุด',
      subtitle: 'ติดตามฟีเจอร์ใหม่ การปรับปรุงประสิทธิภาพ และการแก้ไขข้อผิดพลาด',
      viewFullGithub: 'ดูประวัติทั้งหมดบน GitHub',
    },
    download: {
      badge: 'ไฟล์ติดตั้งเวอร์ชันล่าสุด v2.4',
      title: 'ดาวน์โหลดโปรแกรม FastKey',
      subtitle: 'ไฟล์ปลอดภัย 100% ตรวจสอบผ่าน VirusTotal แล้ว ไม่มีไวรัสหรือมัลแวร์ใดๆ',
      fileName: 'FastKey.exe',
      fileSize: '587 KB',
      filePlatform: 'Windows 10 / 11 (64-bit)',
      pdfName: 'คู่มือการใช้งาน.pdf',
      pdfSize: '445 KB',
      directDownloadBtn: 'ดาวน์โหลด FastKey.exe (587 KB)',
      pdfDownloadBtn: 'ดาวน์โหลดคู่มือ PDF (445 KB)',
      securityBadge: 'ความปลอดภัยระดับสูงสุด',
      securityDesc: 'ผ่านการตรวจโดย VirusTotal 72 เอนจิน (0/72 Clean) ทำงานออฟไลน์ ไม่มีการส่งข้อมูลส่วนตัวออกนอกเครื่อง',
      virusTotalScore: 'VirusTotal: 0/72 ปลอดภัย 100%',
      viewVirusTotal: 'ดูผลตรวจบน VirusTotal',
      portableTag: 'Standalone .exe รันได้ทันที',
    },
    quickStart: {
      title: 'เริ่มต้นใช้งานง่ายๆ ใน 3 ขั้นตอน',
      subtitle: 'ไม่ต้องติดตั้งและไม่ต้องแตกไฟล์ ดาวน์โหลด .exe แล้วเปิดใช้งานได้ทันที',
      step1Title: '1. ดาวน์โหลด FastKey.exe',
      step1Desc: 'ดาวน์โหลดไฟล์ FastKey.exe ขนาดกะทัดรัดเพียง 587 KB โดยตรงจากปุ่มดาวน์โหลด',
      step2Title: '2. ดับเบิลคลิกเปิดโปรแกรม',
      step2Desc: 'ดับเบิลคลิกที่ไฟล์ FastKey.exe เพื่อเปิดใช้งานได้ทันที (ไฟล์เดี่ยว ไม่ต้องติดตั้ง)',
      step3Title: '3. ปลดบล็อก SmartScreen (หากมี)',
      step3Desc: 'หากมีหน้าต่างสีน้ำเงินแจ้งเตือน ให้กด More info > Run anyway เพื่อเริ่มใช้งานทันที',
    },
    docs: {
      badge: 'คู่มือการใช้งาน',
      title: 'คู่มือการใช้งานโปรแกรม FastKey',
      subtitle: 'อธิบายทุกส่วนแบบเข้าใจง่าย มีภาพประกอบตามหน้าตาโปรแกรมจริง พร้อมระบบจำลองการทำงาน',
    },
    footer: {
      tagline: 'FastKey — โปรแกรมคีย์ลัดช่วยพิมพ์และควบคุมเวิร์กโฟลว์ความเร็วสูง',
      copyright: '© 2026 FastKey Team. All rights reserved.',
      securityReport: 'ผลตรวจความปลอดภัย VirusTotal (0/72 Clean)',
    },
  },
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      docs: 'Documentation',
      pricing: 'Pricing',
      changelog: 'Changelog',
      download: 'Download',
      langToggle: 'EN / TH',
      quickDownload: 'Download Free',
    },
    hero: {
      badgeLive: 'FastKey v2.4.0 Live',
      badgeLatency: '0.12ms Latency',
      heading: 'Speed of Light Keyboard & Workflow Engine',
      description: 'Summon developer tools, switch profiles, execute terminal commands, and expand snippets in milliseconds with a zero-latency native hotkey daemon.',
      downloadBtn: 'Download for Windows',
      docsBtn: 'Documentation Guide',
      sandboxBtn: 'Command HUD',
      daemonReady: 'Daemon ready (PID #2841)',
      hookBound: 'Global Keyboard Hook active',
      globalTrigger: 'Global Trigger:',
      gitFlow: 'Git Automation',
      snippets: 'Code Snippets',
      envSwitch: 'Swap Staging / Prod',
      macro: 'Macro Pipeline',
      nativeHookEngine: 'Native Hook Engine 0.12ms latency',
      clickTabsHint: 'Click tabs above to test live execution',
      ultraLight: 'Only 4.6 MB Memory',
      offlinePrivate: '100% Offline & Private',
      zeroDelayFuzzy: 'Zero-Delay Fuzzy Search',
      crossPlatform: 'Windows 10/11 Native',
    },
    features: {
      badge: 'High Performance Power',
      title: 'Engineered for Pure Flow State',
      subtitle: 'Navigate, automate, and control everything without ever lifting your hands from the keyboard.',
      dock: {
        tag: 'Command HUD',
        title: 'Instant Command Floating HUD',
        desc: 'Trigger a floating spotlight HUD to fuzzy-search macros, scripts, and workflows at instantaneous speed.',
      },
      autoSend: {
        tag: 'Auto-Send Macros',
        title: 'Automated Keystroke Dispatcher',
        desc: 'Sequence multi-step key combinations, background window focus, and instant auto-submit macros in 1 click.',
      },
      profiles: {
        tag: 'Context Aware',
        title: 'App-Aware Workspace Profiles',
        desc: 'Automatically switch hotkey configurations depending on which IDE, browser tab, or tool is active.',
      },
      clipboard: {
        tag: 'Snippet Engine',
        title: 'Smart Boilerplate & Snippet Expander',
        desc: 'Type short triggers to dynamically expand rich code templates and customer service messages.',
      },
      sdk: {
        tag: 'Extensibility',
        title: 'TypeScript & Lua Extension SDK',
        desc: 'Extend and customize with local webhooks, event buses, and lightweight sandboxed plugin scripts.',
      },
      fuzzy: {
        tag: 'Security & Privacy',
        title: '100% Clean, Offline & Private',
        desc: 'Audited with 0/72 detections on VirusTotal. Zero network telemetry — your data stays strictly on your device.',
      },
      interactiveTester: 'Real-Time Hardware Key Tester',
      pressKeyPrompt: 'Press any key combination on your physical keyboard to test real-time zero-delay key interception.',
      detectedKey: 'Detected key:',
      viewAllShortcuts: 'View all shortcuts',
    },
    pricing: {
      badge: 'Pricing & Licensing',
      title: 'Simple, Transparent Tiers',
      subtitle: 'Completely free for individual developers, with lifetime power upgrades for power users.',
      freeForever: 'Free Forever',
      oneTime: 'One-time Payment',
      perSeatMonth: 'per user / month',
      downloadFree: 'Download Free Now',
      getPro: 'Upgrade to Pro',
      contactSales: 'Contact Sales',
      buyPro: 'Upgrade to Pro',
      guarantee: '30-day money-back guarantee • Lifetime free updates',
    },
    changelog: {
      badge: 'Release Notes',
      title: 'Continuous Evolution',
      subtitle: 'Stay updated with our latest performance breakthroughs, features, and security patches.',
      viewFullGithub: 'View full release history on GitHub',
    },
    download: {
      badge: 'Latest Stable Release v2.4',
      title: 'Download FastKey',
      subtitle: '100% clean & secure. Audited and certified clean across 72 antivirus engines on VirusTotal.',
      fileName: 'FastKey.exe',
      fileSize: '587 KB',
      filePlatform: 'Windows 10 / 11 (64-bit)',
      pdfName: 'User_Manual.pdf',
      pdfSize: '445 KB',
      directDownloadBtn: 'Download FastKey.exe (587 KB)',
      pdfDownloadBtn: 'Download PDF Manual (445 KB)',
      securityBadge: 'Certified Security & Privacy',
      securityDesc: 'VirusTotal 0/72 Clean audit. Completely offline operation with zero data transmission.',
      virusTotalScore: 'VirusTotal: 0/72 Clean',
      viewVirusTotal: 'View VirusTotal Report',
      portableTag: 'Standalone .exe',
    },
    quickStart: {
      title: 'Get Started in 3 Simple Steps',
      subtitle: 'Zero installation and zero unzipping required. Run directly on your desktop.',
      step1Title: '1. Download FastKey.exe',
      step1Desc: 'Download the lightweight FastKey.exe (587 KB) executable directly from the download button.',
      step2Title: '2. Launch FastKey.exe',
      step2Desc: 'Double click FastKey.exe to start immediately. No installation or extracting needed.',
      step3Title: '3. Unblock SmartScreen (If Prompted)',
      step3Desc: 'If Windows SmartScreen blue advisory appears, click More info > Run anyway.',
    },
    docs: {
      badge: 'Documentation Guide',
      title: 'Complete FastKey User Guide',
      subtitle: 'Step-by-step interactive visual walkthrough and simulation based on the actual desktop software.',
    },
    footer: {
      tagline: 'FastKey — High-speed keyboard shortcut & workflow productivity engine.',
      copyright: '© 2026 FastKey Team. All rights reserved.',
      securityReport: 'VirusTotal Security Audit Report (0/72 Clean)',
    },
  },
};
