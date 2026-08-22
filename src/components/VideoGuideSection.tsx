import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Download,
  FolderArchive,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Terminal,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  FileText,
  MousePointer,
  Sparkles,
  Info,
  Check,
  Search,
  Eye,
  EyeOff,
  X,
  Globe,
  Edit2,
  Save,
  Send,
  HelpCircle,
  Laptop,
} from 'lucide-react';
import { Language } from '../locales';

interface VideoGuideSectionProps {
  isDark: boolean;
  lang?: Language;
}

interface StepItem {
  id: number;
  timecode: string;
  title: string;
  shortDesc: string;
  fullDesc: string[];
  badge: string;
  keyAction: string;
  notes?: string;
  uiFrameType: 'download' | 'extract' | 'smartscreen' | 'overlay' | 'settings' | 'web_whitelist';
}

interface HotkeyRow {
  id: number;
  hotkey: string;
  col1: string;
  col2: string;
  col3: string;
  checked?: boolean;
}

export const VideoGuideSection: React.FC<VideoGuideSectionProps> = ({
  isDark,
  lang = 'th',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'interactive_sim' | 'all_steps'>('walkthrough');

  // Interactive Simulator States
  const [currentProfile, setCurrentProfile] = useState('Admin-work');
  const [availableProfiles, setAvailableProfiles] = useState(['Admin-work', 'Sales-team', 'Support-chat', 'Live-stream']);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');

  // Mode
  const [editorMode, setEditorMode] = useState<'new' | 'edit'>('new');
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  // Form Inputs
  const [inputHotkey, setInputHotkey] = useState('');
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [inputText3, setInputText3] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle Features
  const [autoSendEnabled, setAutoSendEnabled] = useState(false);
  const [showWebModal, setShowWebModal] = useState(false);

  // Whitelist State
  const [newWebKeyword, setNewWebKeyword] = useState('');
  const [allowedWebsites, setAllowedWebsites] = useState<Array<{ id: number; keyword: string; checked: boolean }>>([
    { id: 1, keyword: 'myorder', checked: false },
    { id: 2, keyword: 'pancake', checked: false },
    { id: 3, keyword: 'deeple', checked: false },
    { id: 4, keyword: 'page365', checked: false },
    { id: 5, keyword: 'zortout', checked: false },
    { id: 6, keyword: 'zort', checked: false },
    { id: 7, keyword: 'splendid', checked: false },
    { id: 8, keyword: 'xcommerce', checked: false },
  ]);

  // Main Hotkey Table Data matching clean format
  const [tableData, setTableData] = useState<HotkeyRow[]>([
    { id: 1, hotkey: 'ww', col1: 'ลูกค้า สามารถพิมพ์ ชื่อ ที่อยู่ และเบอร์โทรศัพท์ เพื่อจัดส่งได้เลยค่ะ', col2: '', col3: '', checked: false },
    { id: 2, hotkey: 'ss', col1: 'รอชำระเงินปลายทางได้เลยค่ะ ขอบคุณค่ะ', col2: '', col3: '', checked: false },
    { id: 3, hotkey: 'aa', col1: 'สวัสดีค่ะคุณลูกค้า สอบถามข้อมูลเพิ่มเติมได้ตลอดนะคะ', col2: '', col3: '', checked: false },
    { id: 4, hotkey: 'ff', col1: 'ลูกค้ายกเลิกรายการสั่งซื้อเรียบร้อยแล้วค่ะ', col2: '', col3: '', checked: false },
    { id: 5, hotkey: 'gg', col1: 'แอดมินประสานงานแจ้งทางโกดังตรวจสอบสินค้าให้นะคะ', col2: '', col3: '', checked: false },
    { id: 6, hotkey: 'dd', col1: 'แอดมินดำเนินการตรวจสอบเลขพัสดุให้นะคะ', col2: '', col3: '', checked: false },
    { id: 7, hotkey: 'jj', col1: 'ดำเนินการแก้ไขข้อมูลเรียบร้อยแล้วค่ะคุณลูกค้า', col2: '', col3: '', checked: false },
    { id: 8, hotkey: 'rr', col1: 'สินค้าจะจัดส่งถึงปลายทางภายใน 2-3 วันทำการค่ะ', col2: '', col3: '', checked: false },
    { id: 9, hotkey: 'yy', col1: 'โปรโมชั่นพิเศษมีจำนวนจำกัด สามารถสั่งซื้อได้ทันทีค่ะ', col2: '', col3: '', checked: false },
    { id: 10, hotkey: '33', col1: 'สินค้ารับประกันคุณภาพตรงตามที่ระบุ 100% ค่ะ', col2: '', col3: '', checked: false },
    { id: 11, hotkey: 'กป', col1: 'แก้ไขข้อมูลโปรโมชั่นและรายการสินค้า', col2: '', col3: '', checked: false },
    { id: 12, hotkey: 'กบ', col1: 'แก้ไขหมายเลขโทรศัพท์ติดต่อผู้รับ', col2: '', col3: '', checked: false },
    { id: 13, hotkey: 'กย', col1: 'แก้ไขที่อยู่ในการจัดส่งสินค้า', col2: '', col3: '', checked: false },
    { id: 14, hotkey: '11', col1: 'กรุณาตรวจสอบที่อยู่ในการจัดส่งให้ครบถ้วนถูกต้อง', col2: '', col3: '', checked: false },
  ]);

  const [simOverlayState, setSimOverlayState] = useState<'active' | 'paused' | 'hidden'>('active');
  const [showSimSettings, setShowSimSettings] = useState(true);
  const [simFeedbackMessage, setSimFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const steps: StepItem[] = [
    {
      id: 1,
      timecode: '00:00 - 00:15',
      title: lang === 'th' ? '1. ดาวน์โหลดไฟล์ FastKey.exe' : '1. Download FastKey.exe Executable',
      shortDesc: lang === 'th' ? 'ดาวน์โหลดไฟล์โปรแกรม FastKey.exe (ขนาด 587 KB) และคู่มือ PDF' : 'Download FastKey.exe (587 KB) and optional manual PDF.',
      fullDesc: lang === 'th' ? [
        'เริ่มต้นโดยการดาวน์โหลดไฟล์โปรแกรม `FastKey.exe` ซึ่งมีขนาดกะทัดรัดเพียง 587 KB',
        'ไฟล์ติดตั้งนี้เป็นแบบ Standalone Portable เดี่ยวๆ ไม่ต้องติดตั้งและไม่ต้องแตกไฟล์ สามารถรันได้ทันทีโดยไม่กินทรัพยากรเครื่อง',
        'มีไฟล์คู่มือการใช้งาน `คู่มือการใช้งาน.pdf` ขนาด 445 KB แนบมาให้เพื่อการศึกษาเพิ่มเติม',
      ] : [
        'Begin by downloading the single `FastKey.exe` executable (587 KB).',
        'The distribution is a zero-dependency standalone portable binary requiring no setup or extraction.',
        'An optional reference PDF manual is included for quick offline lookup.',
      ],
      badge: lang === 'th' ? 'ขั้นตอนที่ 1 • ดาวน์โหลด' : 'Step 1 • Download',
      keyAction: lang === 'th' ? 'คลิกดาวน์โหลดไฟล์ FastKey.exe' : 'Click Download FastKey.exe',
      notes: lang === 'th' ? 'ตรวจสอบขนาดไฟล์ให้ตรง 587 KB เพื่อความสมบูรณ์ของข้อมูล' : 'Verify file size is 587 KB.',
      uiFrameType: 'download',
    },
    {
      id: 2,
      timecode: '00:16 - 00:48',
      title: lang === 'th' ? '2. ดับเบิลคลิกเปิดไฟล์ FastKey.exe' : '2. Launch FastKey.exe Directly',
      shortDesc: lang === 'th' ? 'ดับเบิลคลิกที่ไฟล์ FastKey.exe เพื่อเปิดใช้งานได้ทันที ไม่ต้องแตกไฟล์' : 'Double click FastKey.exe to run instantly without extracting.',
      fullDesc: lang === 'th' ? [
        'เปิดโฟลเดอร์ Downloads ในเครื่องคอมพิวเตอร์ของคุณ',
        'ดับเบิลคลิกที่ไฟล์ `FastKey.exe` ได้ทันที ไม่ต้องใช้โปรแกรมช่วยแตกไฟล์ใดๆ',
        'สามารถลากหรือสร้าง Shortcut ไฟล์ `FastKey.exe` ไปวางไว้บนหน้า Desktop เพื่อให้เรียกใช้งานได้สะดวกรวดเร็ว',
      ] : [
        'Open your Downloads folder in Windows File Explorer.',
        'Double-click `FastKey.exe` directly to run. No unzipping or setup required.',
        'You may move the executable or create a shortcut on your Desktop.',
      ],
      badge: lang === 'th' ? 'ขั้นตอนที่ 2 • เปิดใช้งานโดยตรง' : 'Step 2 • Direct Launch',
      keyAction: lang === 'th' ? 'ดับเบิลคลิกที่ไฟล์ FastKey.exe' : 'Double-click FastKey.exe',
      notes: lang === 'th' ? 'ไฟล์โปรแกรมเดี่ยว รันได้ทันทีโดยตรง' : 'Single standalone executable, runs instantly.',
      uiFrameType: 'extract',
    },
    {
      id: 3,
      timecode: '00:49 - 01:06',
      title: lang === 'th' ? '3. เปิดโปรแกรม & ปลดบล็อก Windows Defender SmartScreen' : '3. Launch & Windows Defender SmartScreen',
      shortDesc: lang === 'th' ? 'หากพบหน้าต่างสีน้ำเงินแจ้งเตือน ให้กด More info > Run anyway' : 'On blue SmartScreen popup, click More info > Run anyway.',
      fullDesc: lang === 'th' ? [
        'เมื่อดับเบิลคลิกที่ไฟล์ `FastKey.exe`',
        'เนื่องจากเป็นโปรแกรมพกพาขนาดเล็ก (Standalone Utility) ที่ไม่ได้ลงทะเบียนใบรับรองเชิงพาณิชย์ของ Microsoft หน้าต่างสีน้ำเงิน "Windows protected your PC" อาจปรากฏขึ้น',
        'วิธีเปิดใช้งานอย่างถูกต้องและปลอดภัย:',
        '1. คลิกที่ข้อความลิงก์ "More info" (ข้อมูลเพิ่มเติม)',
        '2. จากนั้นจะมีปุ่ม "Run anyway" (เรียกใช้ต่อไป) ปรากฏขึ้นมา ให้คลิกปุ่มนี้เพื่อเริ่มใช้งาน',
        'มั่นใจได้ 100% โปรแกรมผ่านการตรวจ VirusTotal 72 เอนจิน ไม่พบไวรัสหรือมัลแวร์ใดๆ',
      ] : [
        'When launching `FastKey.exe`.',
        'Windows Defender SmartScreen may display a blue advisory modal for newly built standalone binaries.',
        'Click "More info", then click the "Run anyway" button to start.',
        'Certified 100% safe with 0/72 detections on VirusTotal.',
      ],
      badge: lang === 'th' ? 'ขั้นตอนที่ 3 • ปลดบล็อกระบบ' : 'Step 3 • SmartScreen',
      keyAction: lang === 'th' ? 'คลิก More info > คลิกปุ่ม Run anyway' : 'Click More info > Click Run anyway',
      notes: lang === 'th' ? 'ทำเพียงครั้งแรกครั้งเดียว ครั้งต่อไปจะเปิดได้ทันที' : 'Required only on first launch.',
      uiFrameType: 'smartscreen',
    },
    {
      id: 4,
      timecode: '01:07 - 01:21',
      title: lang === 'th' ? '4. แถบควบคุมลอยด้านบนหน้าจอ (Floating Control Bar)' : '4. Top Floating Control Bar',
      shortDesc: lang === 'th' ? 'โปรแกรมจะเปิดแถบควบคุมด้านบน [ CTRL : ACTIVE ] พร้อมปุ่ม Hide, Pause, Settings, Close' : 'Top floating dock appears with state [ CTRL : ACTIVE ] and control buttons.',
      fullDesc: lang === 'th' ? [
        'เมื่อโปรแกรมเริ่มทำงาน จะปรากฏแถบควบคุมสีดำเรียบหรูอยู่กึ่งกลางด้านบนสุดของหน้าจอ:',
        '• [ CTRL : ACTIVE ]: แสดงว่าระบบตรวจจับคีย์ลัดกำลังทำงานและพร้อมรับคำสั่ง',
        '• ปุ่ม Hide: ใช้สำหรับซ่อนแถบควบคุมเพื่อไม่ให้บดบังการทำงาน',
        '• ปุ่ม Pause / Resume: กดเพื่อหยุดการทำงานของคีย์ลัดชั่วคราว (สถานะจะเปลี่ยนเป็น [ CTRL : PAUSED ]) และกด Resume เพื่อให้กลับมาทำงานต่อ',
        '• ปุ่ม Settings: กดเพื่อเปิดหน้าต่างตั้งค่า Hotkey Settings',
        '• ปุ่ม Close: กดเพื่อปิดโปรแกรม',
      ] : [
        'Once launched, a sleek floating control bar mounts at the top-center of your screen.',
        '• [ CTRL : ACTIVE ]: Real-time state indicator showing the hotkey hook is operational.',
        '• Hide: Conceals the dock from screen view.',
        '• Pause / Resume: Temporarily pauses hotkey interceptors ([ CTRL : PAUSED ]).',
        '• Settings: Opens the Hotkey configuration matrix.',
        '• Close: Shuts down the process.',
      ],
      badge: lang === 'th' ? 'ขั้นตอนที่ 4 • แถบควบคุม' : 'Step 4 • Top Dock',
      keyAction: lang === 'th' ? 'กดปุ่ม Settings เพื่อเปิดหน้าต่าง Hotkey Settings' : 'Click Settings button to configure shortcuts',
      notes: lang === 'th' ? 'แถบควบคุมลอยอยู่เหนือกราฟิกทั้งหมดเพื่อความสะดวกในการเข้าถึง' : 'Always-on-top layout for instant accessibility.',
      uiFrameType: 'overlay',
    },
    {
      id: 5,
      timecode: '01:22 - 01:40',
      title: lang === 'th' ? '5. หน้าต่างตั้งค่า Hotkey Settings & จัดการโปรไฟล์' : '5. Hotkey Settings & Profile Management',
      shortDesc: lang === 'th' ? 'หน้าต่างตั้งค่าจริง: เลือกโปรไฟล์ Admin-work, กรอกข้อความชุดที่ 1-3, ค้นหาข้อมูล, และกดบันทึก' : 'Actual Settings Window: Profile selector, 3 text snippet slots, search filter, and save actions.',
      fullDesc: lang === 'th' ? [
        'หน้าต่าง Hotkey Settings คือศูนย์กลางการจัดการข้อความอัตโนมัติ:',
        '1. เมนูโปรไฟล์: มีปุ่ม `+ เพิ่ม` โปรไฟล์ใหม่, `แก้ชื่อ`, และ `ลบ` โปรไฟล์ (เช่น Admin-work, Sales-team)',
        '2. ช่องกรอกข้อความ 3 ชุด: กำหนด "ข้อความชุดที่ 1:", "ข้อความชุดที่ 2:", "ข้อความชุดที่ 3:" พร้อมปุ่มค้นหา',
        '3. ช่อง "ค้นหาข้อมูล:": สามารถพิมพ์ค้นหาคำตอบ คีย์ลัด หรือข้อความในตารางได้แบบเรียลไทม์',
        '4. ปุ่มล่างซ้าย: ปุ่ม `ส่งออโต้` (เปิด/ปิดการส่งข้อความอัตโนมัติ) และปุ่ม `ตั้งค่าเว็บ` เพื่อระบุเฉพาะเว็บที่อนุญาต',
        '5. ปุ่มล่างขวา: `เคลียร์` (ล้างฟอร์มเพื่อเพิ่มใหม่), `บันทึก` (บันทึกข้อความ), และ `ลบ` (ลบรายการ)',
      ] : [
        'Hotkey Settings Window: Complete workflow orchestration matrix:',
        '1. Profile Bar: Switch profiles (e.g. Admin-work), with Add (+ เพิ่ม), Rename (แก้ชื่อ), and Delete (ลบ) buttons.',
        '2. Three Text Slots: Input Message 1, 2, and 3 with quick browse buttons.',
        '3. Live Search Bar: Filter keywords instantly across your shortcut database.',
        '4. Bottom-Left Actions: Auto-Send toggle (ส่งออโต้) and Allowed Websites Whitelist (ตั้งค่าเว็บ).',
        '5. Bottom-Right Actions: Clear (เคลียร์), Save (บันทึก), and Delete (ลบ).',
      ],
      badge: lang === 'th' ? 'ขั้นตอนที่ 5 • หน้าต่างตั้งค่าจริง' : 'Step 5 • Actual Settings UI',
      keyAction: lang === 'th' ? 'กรอกคีย์ลัดและข้อความชุด 1-3 > กดปุ่ม [ บันทึก ]' : 'Input hotkey and text slots > Click [ Save ]',
      notes: lang === 'th' ? 'รองรับข้อความยาว ข้อความตอบแชท และคำตอบสำเร็จรูปทุกประเภท' : 'Supports multiline text and customer support templates.',
      uiFrameType: 'settings',
    },
    {
      id: 6,
      timecode: '01:41 - 01:56',
      title: lang === 'th' ? '6. จัดการเว็บไซต์ที่อนุญาต (Whitelist Window Title)' : '6. Allowed Websites Management',
      shortDesc: lang === 'th' ? 'กำหนดคีย์เวิร์ดหัวข้อเว็บ เช่น myorder, pancake, deeple, page365, zortout, splendid' : 'Manage allowed window title keywords: myorder, pancake, deeple, page365, etc.',
      fullDesc: lang === 'th' ? [
        'กดปุ่ม "ตั้งค่าเว็บ" จากหน้าต่างหลักเพื่อเปิดหน้าต่าง "จัดการเว็บไซต์ที่อนุญาต":',
        '1. ช่องเพิ่มเว็บ: "เพิ่มชื่อเว็บไซต์หรือคีย์เวิร์ดบนหัวข้อหน้าต่าง (Window Title):" กรอกชื่อเว็บแล้วกดปุ่ม `+ เพิ่มเว็บ`',
        '2. รายการคีย์เวิร์ดที่อนุญาตทั้งหมด: ตรวจสอบรายชื่อเว็บ เช่น `myorder`, `pancake`, `deeple`, `page365`, `zortout`, `zort`, `splendid`, `xcommerce`',
        '3. ความปลอดภัย: โปรแกรมจะทำงานเฉพาะเมื่อหน้าต่างที่ใช้งานอยู่มีชื่อตรงกับคีย์เวิร์ดเหล่านี้เท่านั้น ป้องกันการส่งข้อความผิดหน้าต่าง',
        '4. การลบ: ติ๊กถูกที่ช่องหน้าชื่อเว็บแล้วกดปุ่ม `ลบที่เลือก` จากนั้นกด `ปิดหน้าต่าง`',
      ] : [
        'Click "ตั้งค่าเว็บ" to launch Allowed Websites Management dialog:',
        '1. Add Title Keyword: Type window title identifier and click "+ เพิ่มเว็บ".',
        '2. Active Whitelist: Includes presets such as myorder, pancake, deeple, page365, zortout, splendid, xcommerce.',
        '3. Context Security: Hotkeys only trigger when the active window title matches approved keywords.',
        '4. Removal: Check the box next to any keyword and click "ลบที่เลือก".',
      ],
      badge: lang === 'th' ? 'ขั้นตอนที่ 6 • เว็บไซต์ที่อนุญาต' : 'Step 6 • Allowed Sites',
      keyAction: lang === 'th' ? 'กด [ ตั้งค่าเว็บ ] > เพิ่มชื่อระบบหรือเว็บที่ต้องการ' : 'Click [ ตั้งค่าเว็บ ] > Add CRM / Web Keywords',
      notes: lang === 'th' ? 'ช่วยให้คีย์ลัดทำงานอย่างแม่นยำ ปลอดภัย ไม่รบกวนโปรแกรมอื่นในเครื่อง' : 'Prevents accidental triggers in unapproved applications.',
      uiFrameType: 'web_whitelist',
    },
  ];

  const currentStep = steps[currentStepIndex];

  // Auto playback simulation timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  // Helper functions for realistic interaction
  const handleSelectRow = (row: HotkeyRow) => {
    setEditingRowId(row.id);
    setEditorMode('edit');
    setInputHotkey(row.hotkey);
    setInputText1(row.col1);
    setInputText2(row.col2);
    setInputText3(row.col3);
  };

  const handleClearForm = () => {
    setEditorMode('new');
    setEditingRowId(null);
    setInputHotkey('');
    setInputText1('');
    setInputText2('');
    setInputText3('');
    setSimFeedbackMessage({ text: 'ล้างแบบฟอร์มพร้อมสำหรับการเพิ่มใหม่', type: 'info' });
    setTimeout(() => setSimFeedbackMessage(null), 2500);
  };

  const handleSaveEntry = () => {
    if (!inputHotkey.trim() && !inputText1.trim()) {
      setSimFeedbackMessage({ text: 'กรุณากรอกคีย์ลัดหรือข้อความชุดที่ 1 ก่อนบันทึก!', type: 'error' });
      setTimeout(() => setSimFeedbackMessage(null), 3000);
      return;
    }

    if (editorMode === 'edit' && editingRowId !== null) {
      setTableData((prev) =>
        prev.map((r) =>
          r.id === editingRowId
            ? { ...r, hotkey: inputHotkey || r.hotkey, col1: inputText1, col2: inputText2, col3: inputText3 }
            : r
        )
      );
      setSimFeedbackMessage({ text: `บันทึกการแก้ไขคีย์ลัด "${inputHotkey}" เรียบร้อยแล้ว!`, type: 'success' });
    } else {
      const newId = Date.now();
      const newEntry: HotkeyRow = {
        id: newId,
        hotkey: inputHotkey || `k${tableData.length + 1}`,
        col1: inputText1 || 'ข้อความชุดที่ 1',
        col2: inputText2 || '',
        col3: inputText3 || '',
        checked: false,
      };
      setTableData((prev) => [newEntry, ...prev]);
      setEditingRowId(newId);
      setSimFeedbackMessage({ text: `เพิ่มรายการคีย์ลัด "${newEntry.hotkey}" สำเร็จ!`, type: 'success' });
    }
    setTimeout(() => setSimFeedbackMessage(null), 3500);
  };

  const handleDeleteEntry = () => {
    const checkedRows = tableData.filter((r) => r.checked);
    if (checkedRows.length > 0) {
      setTableData((prev) => prev.filter((r) => !r.checked));
      handleClearForm();
      setSimFeedbackMessage({ text: `ลบ ${checkedRows.length} รายการที่เลือกเรียบร้อยแล้ว!`, type: 'error' });
    } else if (editingRowId !== null) {
      setTableData((prev) => prev.filter((r) => r.id !== editingRowId));
      handleClearForm();
      setSimFeedbackMessage({ text: 'ลบรายการที่เลือกสำเร็จ!', type: 'error' });
    } else {
      setSimFeedbackMessage({ text: 'กรุณาเลือกแถวหรือติ๊กถูกหน้ารายการที่ต้องการลบ!', type: 'error' });
    }
    setTimeout(() => setSimFeedbackMessage(null), 3000);
  };

  const toggleRowCheckbox = (id: number) => {
    setTableData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  };

  const toggleSelectAll = () => {
    const allChecked = tableData.every((r) => r.checked);
    setTableData((prev) => prev.map((r) => ({ ...r, checked: !allChecked })));
  };

  const handleAddWebKeyword = () => {
    if (!newWebKeyword.trim()) return;
    setAllowedWebsites((prev) => [
      ...prev,
      { id: Date.now(), keyword: newWebKeyword.trim().toLowerCase(), checked: false },
    ]);
    setNewWebKeyword('');
  };

  const handleDeleteSelectedWeb = () => {
    setAllowedWebsites((prev) => prev.filter((w) => !w.checked));
  };

  const filteredTableData = tableData.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.hotkey.toLowerCase().includes(q) ||
      r.col1.toLowerCase().includes(q) ||
      r.col2.toLowerCase().includes(q) ||
      r.col3.toLowerCase().includes(q)
    );
  });

  return (
    <div id="video-guide" className="w-full space-y-10">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0E0E12] border-zinc-800' : 'bg-white border-zinc-200'} shadow-xl`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono-code text-zinc-200 mb-3 shadow-[0_0_12px_rgba(255,255,255,0.05)]">
              <Play className="w-3 h-3 text-white fill-white" />
              <span>{lang === 'th' ? 'วิดีโอ & คู่มือแกะขั้นตอนอย่างละเอียด' : 'Interactive Video & Visual Deconstruction'}</span>
            </div>
            <h2 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              {lang === 'th' ? 'คู่มือการติดตั้งและตั้งค่าโปรแกรมจริง (Step-by-Step)' : 'Complete Setup & UI Configuration Guide'}
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {lang === 'th'
                ? 'ถอดบทเรียนจากหน้าตาโปรแกรมจริง 100%: ตั้งแต่การดาวน์โหลด, SmartScreen, แถบลอยด้านบน, หน้าต่าง Hotkey Settings, การพิมพ์ข้อความชุดที่ 1-3, ระบบค้นหาข้อมูล, ส่งออโต้ และการตั้งค่าเว็บไซต์ที่อนุญาต'
                : 'Direct translation of the live desktop client: profile management, 3 text snippet slots, live data search, auto-send switch, and allowed website whitelist.'}
            </p>
          </div>

          {/* Quick Tab Switcher & Drive Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://drive.google.com/drive/u/0/folders/1PufiPZax-6bnuSh7OF5qrux7Cc6sdXtF"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-white text-black font-extrabold text-xs font-mono-code flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-zinc-200 transition-all shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'th' ? 'เปิดโฟลเดอร์วิดีโอ (Google Drive)' : 'Open Video on Google Drive'}</span>
            </a>

            <div className="flex items-center p-1.5 rounded-2xl bg-black/40 border border-white/10 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('walkthrough')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'walkthrough'
                    ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'ดูจำลองวิดีโอ' : 'Video Player'}</span>
              </button>
              <button
                onClick={() => setActiveTab('interactive_sim')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'interactive_sim'
                    ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'ทดลองจำลองโปรแกรมจริง' : 'Live Simulator'}</span>
              </button>
              <button
                onClick={() => setActiveTab('all_steps')}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'all_steps'
                    ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'ภาพทุกขั้นตอน (6 สเต็ป)' : 'All 6 Steps'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: WALKTHROUGH PLAYER */}
      {activeTab === 'walkthrough' && (
        <div className="space-y-8">
          {/* Main Visual Display Screen */}
          <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-[#070709] shadow-2xl relative">
            {/* Player Top Bar */}
            <div className="px-4 sm:px-6 py-3 bg-[#111116] border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <span className="font-mono-code text-xs text-zinc-300 font-semibold truncate">
                  FastKey / GodkeyX1 Desktop Workflow Guide • {currentStep.title}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono-code text-xs text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">{currentStep.timecode}</span>
                <span className="hidden sm:inline">({currentStepIndex + 1} / {steps.length})</span>
              </div>
            </div>

            {/* Virtual Screen Canvas (Illustration of current video step) */}
            <div className="p-4 sm:p-8 min-h-[440px] sm:min-h-[500px] flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0e0e13] via-[#09090c] to-[#050508]">
              {/* Background ambient grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Render dynamic UI Frame based on current step */}
              <div className="w-full max-w-4xl z-10 animate-in fade-in zoom-in-95 duration-300">
                {currentStep.uiFrameType === 'download' && (
                  <div className="rounded-2xl border border-zinc-700 bg-[#16161D] shadow-2xl p-6 sm:p-8">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-6 h-6 text-white" />
                        <div>
                          <div className="font-bold text-white text-base">Google Drive / FastKey Cloud Storage</div>
                          <div className="text-xs text-zinc-400 font-mono-code">โฟลเดอร์หลัก &gt; Hotkey &gt; Release v2.4.0</div>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-white/10 text-white font-mono-code">587 KB</span>
                    </div>

                    <div className="space-y-3 font-mono-code text-xs sm:text-sm">
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-zinc-800 text-zinc-300">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-zinc-400" />
                          <span>คู่มือการใช้งาน.pdf</span>
                        </div>
                        <span className="text-zinc-500">445 KB</span>
                      </div>
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <div className="flex items-center gap-3">
                          <Laptop className="w-5 h-5 text-white" />
                          <span>FastKey.exe</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white text-black font-extrabold uppercase">Ready</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-300">587 KB</span>
                          <div className="p-1.5 rounded-lg bg-white text-black">
                            <Download className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl border border-zinc-800 bg-black/30 flex items-center justify-between text-xs font-mono-code text-zinc-400">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-white" />
                        <span>SHA-256 Checksum Verified & VirusTotal 0/72 Clean</span>
                      </div>
                      <span className="text-white font-bold">100% Offline Safe</span>
                    </div>
                  </div>
                )}

                {currentStep.uiFrameType === 'extract' && (
                  <div className="rounded-2xl border border-zinc-700 bg-[#16161D] shadow-2xl p-6 sm:p-8">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-6 h-6 text-white" />
                        <div>
                          <div className="font-bold text-white text-base">Windows File Explorer (โฟลเดอร์ Downloads)</div>
                          <div className="text-xs text-zinc-400 font-mono-code">ดับเบิลคลิกไฟล์ FastKey.exe เพื่อเปิดใช้งานได้ทันที (ไม่ต้องติดตั้ง)</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-xs font-mono-code space-y-2">
                        <div className="text-zinc-400 pb-2 border-b border-zinc-800">โฟลเดอร์ Downloads / Desktop</div>
                        <div className="p-3 rounded-xl bg-white text-black font-bold flex items-center justify-between shadow-lg">
                          <div className="flex items-center gap-2.5">
                            <Laptop className="w-5 h-5 text-black" />
                            <div>
                              <div>FastKey.exe</div>
                              <div className="text-[10px] text-zinc-600 font-normal font-mono-code">Application • 587 KB</div>
                            </div>
                          </div>
                          <MousePointer className="w-4 h-4 fill-black" />
                        </div>
                        <div className="p-2 rounded bg-white/5 text-zinc-400 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-zinc-500" />
                          <span>คู่มือการใช้งาน.pdf</span>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-900 border border-white/20 shadow-xl space-y-3 text-xs">
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>Standalone Portable Application</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">
                          โปรแกรม FastKey.exe เป็นไฟล์เดี่ยวแบบ Portable สามารถรันได้ทันทีโดยไม่ต้องติดตั้ง และไม่ต้องแตกไฟล์
                        </p>
                        <div className="p-3 rounded-lg bg-black/60 border border-zinc-800 text-zinc-400 font-mono-code text-[11px]">
                          Action: Double-click FastKey.exe to start
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep.uiFrameType === 'smartscreen' && (
                  <div className="rounded-2xl border border-zinc-700 bg-[#16161D] shadow-2xl p-6 sm:p-8">
                    <div className="max-w-lg mx-auto rounded-2xl overflow-hidden border border-blue-500/30 bg-[#004275] text-white p-6 sm:p-8 shadow-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <ShieldAlert className="w-8 h-8 text-white shrink-0" />
                        <h3 className="font-display text-xl sm:text-2xl font-bold">Windows protected your PC</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-100 mb-6 leading-relaxed">
                        Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk.
                      </p>

                      <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 text-xs font-mono-code mb-6 space-y-1">
                        <div>App: <strong>FastKey.exe</strong></div>
                        <div>Publisher: <strong>Unknown Publisher (Standalone)</strong></div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <span className="text-xs font-mono-code text-white underline cursor-pointer hover:text-blue-200 font-bold">
                          More info (ข้อมูลเพิ่มเติม)
                        </span>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-black/30 border border-white/20 text-xs font-bold text-white hover:bg-black/50">
                            Don&apos;t run
                          </button>
                          <button className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-white text-black font-extrabold text-xs shadow-lg hover:bg-zinc-100 flex items-center gap-1.5">
                            <Check className="w-4 h-4" /> Run anyway (เรียกใช้)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep.uiFrameType === 'overlay' && (
                  <div className="rounded-2xl border border-zinc-700 bg-[#16161D] shadow-2xl p-6 sm:p-8">
                    <div className="text-center text-xs font-mono-code text-zinc-400 mb-6">
                      แถบคำสั่งลอยกึ่งกลางด้านบนหน้าจอ (Top-Center Screen Overlay)
                    </div>

                    <div className="max-w-xl mx-auto p-2.5 rounded-2xl bg-black/90 border border-white/30 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono-code font-bold text-white">
                        <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse"></span>
                        <span>[ CTRL : ACTIVE ]</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono-code text-zinc-300">
                          Hide
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono-code text-zinc-300">
                          Pause
                        </button>
                        <button className="px-4 py-1.5 rounded-lg bg-white text-black font-extrabold text-xs font-mono-code shadow-[0_0_12px_rgba(255,255,255,0.4)] flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Settings</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 text-xs font-mono-code text-zinc-400 hover:text-red-400">
                          Close
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono-code text-zinc-400">
                      <div className="p-3 rounded-xl bg-black/30 border border-zinc-800">
                        <div className="text-white font-bold mb-1">Hide</div>
                        <div className="text-[11px]">ซ่อนแถบลอย</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/30 border border-zinc-800">
                        <div className="text-white font-bold mb-1">Pause / Resume</div>
                        <div className="text-[11px]">หยุด/เริ่มตรวจจับ</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/30 border border-zinc-800">
                        <div className="text-white font-bold mb-1">Settings</div>
                        <div className="text-[11px]">เปิดตั้งค่าคีย์ลัด</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/30 border border-zinc-800">
                        <div className="text-white font-bold mb-1">Close</div>
                        <div className="text-[11px]">ปิดโปรแกรม</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep.uiFrameType === 'settings' && (
                  <div className="rounded-2xl border border-zinc-700 bg-[#F5F5F7] text-zinc-900 shadow-2xl p-4 sm:p-6 overflow-hidden">
                    {/* Realistic Desktop App Window Mockup */}
                    <div className="border border-zinc-300 rounded-xl bg-white shadow-xl overflow-hidden font-sans text-xs">
                      {/* Window Header */}
                      <div className="bg-[#FAF0E6] px-3 py-1.5 border-b border-zinc-300 flex items-center justify-between">
                        <span className="font-semibold text-zinc-800">Hotkey Settings</span>
                        <span className="w-5 h-4 bg-red-600 text-white font-bold flex items-center justify-center text-[10px] rounded-sm cursor-pointer">✕</span>
                      </div>

                      <div className="p-4 space-y-3">
                        {/* Profile Bar */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-zinc-800">โปรไฟล์:</span>
                          <div className="px-3 py-1 bg-white border border-zinc-300 rounded text-zinc-800 flex items-center gap-2 min-w-[140px] justify-between">
                            <span>Admin-work</span>
                            <span className="text-[10px]">▼</span>
                          </div>
                          <button className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-semibold flex items-center gap-1">
                            <Plus className="w-3 h-3" /> เพิ่ม
                          </button>
                          <button className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-semibold flex items-center gap-1">
                            <Edit2 className="w-3 h-3" /> แก้ชื่อ
                          </button>
                          <button className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-semibold flex items-center gap-1">
                            <Trash2 className="w-3 h-3" /> ลบ
                          </button>
                        </div>

                        {/* Mode Tag */}
                        <div className="text-red-600 font-bold text-xs">[ โหมด: เพิ่มใหม่ ]</div>

                        {/* Slots */}
                        <div className="space-y-2">
                          {['ข้อความชุดที่ 1:', 'ข้อความชุดที่ 2:', 'ข้อความชุดที่ 3:'].map((label, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="w-24 text-zinc-700 font-semibold shrink-0">{label}</span>
                              <div className="flex-1 flex items-center gap-1">
                                <input
                                  readOnly
                                  value={idx === 0 ? '🖤🐼 📝 ลูกค้า สามารถ "พิมพ์" ชื่อ... บ้านเลข...' : ''}
                                  className="flex-1 px-2.5 py-1 border border-zinc-300 rounded bg-white text-zinc-800 text-xs"
                                />
                                <button className="p-1 border border-zinc-300 rounded bg-zinc-100 hover:bg-zinc-200">
                                  <Search className="w-3.5 h-3.5 text-zinc-600" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center gap-2 pt-1 border-t border-zinc-200">
                          <span className="w-24 text-zinc-700 font-semibold shrink-0">ค้นหาข้อมูล:</span>
                          <input
                            readOnly
                            placeholder="พิมพ์ค้นหาคำตอบหรือคีย์ลัด..."
                            className="flex-1 px-2.5 py-1 border border-zinc-300 rounded bg-white text-zinc-800 text-xs"
                          />
                        </div>

                        {/* Sample Rows */}
                        <div className="border border-zinc-300 rounded overflow-hidden max-h-36 overflow-y-auto">
                          <table className="w-full text-left text-[11px]">
                            <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200">
                              <tr>
                                <th className="p-1.5 w-24">คีย์ลัด (Hotke...</th>
                                <th className="p-1.5">ข้อความชุดที่ 1</th>
                                <th className="p-1.5">ข้อความชุดที่ 2</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              <tr className="bg-blue-50/70">
                                <td className="p-1.5 font-bold text-zinc-900">ww</td>
                                <td className="p-1.5 truncate max-w-[200px]">ลูกค้า สามารถพิมพ์ ชื่อ...</td>
                                <td className="p-1.5">-</td>
                              </tr>
                              <tr>
                                <td className="p-1.5 font-bold text-zinc-900">ss</td>
                                <td className="p-1.5 truncate max-w-[200px]">รอชำระปลายทางได้เลยค่ะ</td>
                                <td className="p-1.5">-</td>
                              </tr>
                              <tr>
                                <td className="p-1.5 font-bold text-zinc-900">กป</td>
                                <td className="p-1.5 truncate max-w-[200px]">แก้ไขข้อมูลโปรโมชั่น</td>
                                <td className="p-1.5">-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <button className="px-2.5 sm:px-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-700 font-semibold flex items-center gap-1 text-[11px]">
                              <Sliders className="w-3 h-3" /> ส่งออโต้
                            </button>
                            <button className="px-2.5 sm:px-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-700 font-semibold flex items-center gap-1 text-[11px]">
                              <Globe className="w-3 h-3" /> ตั้งค่าเว็บ
                            </button>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <button className="px-2.5 sm:px-3 py-1 bg-zinc-100 border border-zinc-300 rounded text-zinc-700 font-semibold text-[11px]">
                              + เคลียร์
                            </button>
                            <button className="px-3 py-1 bg-zinc-800 text-white font-bold rounded shadow text-[11px] flex items-center gap-1">
                              <Save className="w-3 h-3" /> บันทึก
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white font-bold rounded text-[11px] flex items-center gap-1">
                              <Trash2 className="w-3 h-3" /> ลบ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep.uiFrameType === 'web_whitelist' && (
                  <div className="rounded-2xl border border-zinc-700 bg-[#F5F5F7] text-zinc-900 shadow-2xl p-4 sm:p-6 overflow-hidden">
                    {/* Allowed Websites Management Modal Window */}
                    <div className="max-w-md mx-auto border border-zinc-300 rounded-xl bg-white shadow-2xl overflow-hidden font-sans text-xs">
                      {/* Window Header */}
                      <div className="bg-[#FAF0E6] px-3 py-1.5 border-b border-zinc-300 flex items-center justify-between">
                        <span className="font-bold text-zinc-800">จัดการเว็บไซต์ที่อนุญาต</span>
                        <span className="w-5 h-4 bg-red-600 text-white font-bold flex items-center justify-center text-[10px] rounded-sm cursor-pointer">✕</span>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <div className="text-[11px] font-semibold text-zinc-700 flex items-center gap-1.5 mb-1.5">
                            <Globe className="w-3.5 h-3.5 text-zinc-600" />
                            <span>เพิ่มชื่อเว็บไซต์หรือคีย์เวิร์ดบนหัวข้อหน้าต่าง (Window Title):</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              readOnly
                              value="myorder"
                              className="flex-1 px-2.5 py-1.5 border-2 border-blue-500 rounded bg-white text-zinc-900 font-mono text-xs outline-none"
                            />
                            <button className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-bold flex items-center gap-1 text-xs">
                              <Plus className="w-3.5 h-3.5" /> เพิ่มเว็บ
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="text-[11px] font-semibold text-zinc-700 flex items-center gap-1.5 mb-1.5">
                            <FileText className="w-3.5 h-3.5 text-zinc-600" />
                            <span>รายการคีย์เวิร์ดเว็บที่อนุญาตทั้งหมด:</span>
                          </div>
                          <div className="border border-zinc-300 rounded p-2 bg-white max-h-40 overflow-y-auto space-y-1.5">
                            {['myorder', 'pancake', 'deeple', 'page365', 'zortout', 'zort', 'splendid', 'xcommerce'].map((kw, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-zinc-800 font-mono px-1 py-0.5 hover:bg-zinc-50 rounded">
                                <input type="checkbox" readOnly checked={i === 0} className="rounded" />
                                <span>{kw}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                          <button className="px-3 py-1 bg-zinc-100 border border-zinc-300 rounded text-zinc-700 font-semibold flex items-center gap-1 text-xs">
                            <Trash2 className="w-3.5 h-3.5" /> ลบที่เลือก
                          </button>
                          <button className="px-4 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-bold text-xs">
                            ปิดหน้าต่าง
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-4 sm:p-6 bg-[#111116] border-t border-zinc-800 space-y-4">
              {/* Step Progress Timeline Scrub */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {steps.map((st, sIdx) => {
                  const isCurrent = currentStepIndex === sIdx;
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setCurrentStepIndex(sIdx);
                        setIsPlaying(false);
                      }}
                      className={`
                        text-left p-2.5 rounded-xl border text-xs font-mono-code transition-all
                        ${isCurrent
                          ? 'bg-white text-black border-white font-bold shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                          : 'bg-black/40 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-bold">Step {st.id}</span>
                        <span className="text-[9px] opacity-80">{st.timecode.split(' - ')[0]}</span>
                      </div>
                      <div className="truncate text-[11px]">{st.title.split('. ')[1]}</div>
                    </button>
                  );
                })}
              </div>

              {/* Playback Buttons & Action Bar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-4 py-2 rounded-xl bg-white text-black font-extrabold text-xs font-mono-code flex items-center gap-2 shadow-[0_0_12px_rgba(255,255,255,0.3)] hover:bg-zinc-100 transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                    <span>{isPlaying ? (lang === 'th' ? 'พักเล่น' : 'Pause') : (lang === 'th' ? 'เล่นอัตโนมัติ' : 'Auto Play')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStepIndex(0);
                      setIsPlaying(false);
                    }}
                    className="p-2 rounded-xl bg-white/5 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentStepIndex === 0}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-40 text-xs font-mono-code flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{lang === 'th' ? 'ขั้นตอนก่อนหน้า' : 'Previous'}</span>
                  </button>
                  <button
                    onClick={() => setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                    disabled={currentStepIndex === steps.length - 1}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs font-mono-code flex items-center gap-1"
                  >
                    <span>{lang === 'th' ? 'ขั้นตอนถัดไป' : 'Next Step'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Step Explanations & Notes */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0E0E12] border-zinc-800' : 'bg-white border-zinc-200'} shadow-xl`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-white text-black font-mono-code font-extrabold text-xs shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {currentStep.badge}
              </span>
              <span className="text-xs font-mono-code text-zinc-400">ช่วงเวลาในวิดีโอ: {currentStep.timecode}</span>
            </div>

            <h3 className={`font-display text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              {currentStep.title}
            </h3>

            <div className="space-y-3 mb-6">
              {currentStep.fullDesc.map((par, pIdx) => (
                <p key={pIdx} className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {par}
                </p>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-code">
              <div className="flex items-center gap-2.5 text-zinc-200">
                <Sparkles className="w-4 h-4 text-white shrink-0" />
                <span><strong>คำสั่งสำคัญ:</strong> {currentStep.keyAction}</span>
              </div>
              {currentStep.notes && (
                <div className="text-zinc-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{currentStep.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE LIVE SIMULATOR (Pixel-Perfect Recreation) */}
      {activeTab === 'interactive_sim' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0E0E12] border-zinc-800' : 'bg-white border-zinc-200'} shadow-2xl space-y-8`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono-code text-zinc-200 mb-2 font-semibold">
              <Sliders className="w-3.5 h-3.5 text-white" />
              <span>{lang === 'th' ? 'โปรแกรมจำลองหน้าจอจริง 100% (Interactive Live Simulator)' : '100% True-to-Life Interactive Desktop Simulator'}</span>
            </div>
            <h3 className={`font-display text-2xl sm:text-3xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
              {lang === 'th' ? 'ทดลองคลิกใช้งานหน้าต่าง Hotkey Settings & จัดการเว็บไซต์ที่อนุญาต' : 'Test Drive Hotkey Settings & Allowed Websites Management'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {lang === 'th'
                ? 'ลองคลิกเลือกแถวในตาราง, พิมพ์ค้นหาข้อมูล, สลับโปรไฟล์, กดปุ่ม [ 🌐 ตั้งค่าเว็บ ] เพื่อเปิดหน้าต่างจัดการเว็บไซต์ หรือกด [ ⚪ ส่งออโต้ ]'
                : 'Interactive recreation of the real desktop interface: click rows, search live, manage allowed site window titles, and toggle auto-send.'}
            </p>
          </div>

          {/* Virtual Desktop Canvas */}
          <div className="rounded-3xl border border-zinc-700 bg-gradient-to-b from-zinc-900 via-[#0B0B0E] to-black min-h-[640px] p-4 sm:p-8 relative overflow-hidden flex flex-col items-center justify-start gap-6 shadow-2xl">
            {/* Ambient Windows Glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* 1. Top Floating Bar Simulator */}
            {simOverlayState !== 'hidden' ? (
              <div className="z-20 w-full max-w-xl p-2 rounded-2xl bg-black/95 border border-white/30 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex flex-wrap items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono-code font-bold text-white">
                  <span className={`w-2 h-2 rounded-full ${simOverlayState === 'active' ? 'bg-white shadow-[0_0_8px_#ffffff] animate-pulse' : 'bg-amber-400'}`}></span>
                  <span>{simOverlayState === 'active' ? '[ CTRL : ACTIVE ]' : '[ CTRL : PAUSED ]'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSimOverlayState('hidden')}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono-code text-zinc-300 transition-colors"
                  >
                    Hide
                  </button>
                  <button
                    onClick={() => setSimOverlayState(simOverlayState === 'active' ? 'paused' : 'active')}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono-code text-zinc-300 transition-colors"
                  >
                    {simOverlayState === 'active' ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => setShowSimSettings(!showSimSettings)}
                    className="px-4 py-1.5 rounded-lg bg-white text-black font-extrabold text-xs font-mono-code shadow-[0_0_12px_rgba(255,255,255,0.4)] flex items-center gap-1.5 hover:bg-zinc-100"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowSimSettings(false);
                      setSimOverlayState('hidden');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 text-xs font-mono-code text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="z-20 p-3 rounded-2xl bg-black/80 border border-zinc-800 text-xs font-mono-code text-zinc-400 flex items-center gap-3">
                <span>แถบควบคุมถูกซ่อนอยู่ (Hidden)</span>
                <button
                  onClick={() => setSimOverlayState('active')}
                  className="px-3 py-1 rounded-lg bg-white text-black font-bold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> แสดงแถบควบคุม
                </button>
              </div>
            )}

            {/* 2. Hotkey Settings Desktop Window (Exact Pixel Matching from Image 1) */}
            {showSimSettings && (
              <div className="z-30 w-full max-w-3xl rounded-xl border border-zinc-400 bg-[#FAF0E6]/30 backdrop-blur-md shadow-2xl overflow-hidden font-sans text-xs animate-in zoom-in-95 duration-200">
                {/* Title Bar */}
                <div className="bg-[#FAF0E6] px-4 py-2 border-b border-zinc-300 flex items-center justify-between select-none">
                  <div className="font-semibold text-zinc-900 text-sm">Hotkey Settings</div>
                  <button
                    onClick={() => setShowSimSettings(false)}
                    className="w-6 h-5 bg-[#D9534F] hover:bg-red-600 text-white font-bold flex items-center justify-center text-xs rounded-sm transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Main Content Body */}
                <div className="p-4 sm:p-5 bg-[#FAFAFA] space-y-3.5 text-zinc-800">
                  {/* Row 1: Profile Selector Bar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-zinc-800">โปรไฟล์:</span>
                    <select
                      value={currentProfile}
                      onChange={(e) => {
                        setCurrentProfile(e.target.value);
                        setSimFeedbackMessage({ text: `สลับไปยังโปรไฟล์ "${e.target.value}" แล้ว`, type: 'info' });
                        setTimeout(() => setSimFeedbackMessage(null), 2000);
                      }}
                      className="px-3 py-1 bg-white border border-zinc-300 rounded text-zinc-800 font-medium outline-none focus:border-zinc-500 min-w-[150px]"
                    >
                      {availableProfiles.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        const name = prompt('ตั้งชื่อโปรไฟล์ใหม่ (เช่น Live-Chat, CS-Night):');
                        if (name && !availableProfiles.includes(name)) {
                          setAvailableProfiles([...availableProfiles, name]);
                          setCurrentProfile(name);
                          setSimFeedbackMessage({ text: `เพิ่มโปรไฟล์ "${name}" สำเร็จ!`, type: 'success' });
                          setTimeout(() => setSimFeedbackMessage(null), 2500);
                        }
                      }}
                      className="px-2.5 py-1 bg-[#F0F0F0] hover:bg-zinc-200 border border-zinc-300 rounded font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> เพิ่ม
                    </button>

                    <button
                      onClick={() => {
                        const newName = prompt(`เปลี่ยนชื่อโปรไฟล์ "${currentProfile}" เป็น:`, currentProfile);
                        if (newName && newName !== currentProfile) {
                          setAvailableProfiles(availableProfiles.map((p) => (p === currentProfile ? newName : p)));
                          setCurrentProfile(newName);
                          setSimFeedbackMessage({ text: `เปลี่ยนชื่อเป็น "${newName}" แล้ว`, type: 'success' });
                          setTimeout(() => setSimFeedbackMessage(null), 2000);
                        }
                      }}
                      className="px-2.5 py-1 bg-[#F0F0F0] hover:bg-zinc-200 border border-zinc-300 rounded font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> แก้ชื่อ
                    </button>

                    <button
                      onClick={() => {
                        if (availableProfiles.length <= 1) {
                          alert('ไม่สามารถลบโปรไฟล์สุดท้ายได้');
                          return;
                        }
                        if (confirm(`คุณต้องการลบโปรไฟล์ "${currentProfile}" หรือไม่?`)) {
                          const rem = availableProfiles.filter((p) => p !== currentProfile);
                          setAvailableProfiles(rem);
                          setCurrentProfile(rem[0]);
                          setSimFeedbackMessage({ text: `ลบโปรไฟล์เรียบร้อยแล้ว`, type: 'error' });
                          setTimeout(() => setSimFeedbackMessage(null), 2000);
                        }
                      }}
                      className="px-2.5 py-1 bg-[#F0F0F0] hover:bg-zinc-200 border border-zinc-300 rounded font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> ลบ
                    </button>
                  </div>

                  {/* Mode Indicator & Hotkey Trigger Field */}
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold text-xs tracking-wide">
                      {editorMode === 'new' ? '[ โหมด: เพิ่มใหม่ ]' : `[ โหมด: แก้ไขข้อมูล - แถว #${editingRowId} ]`}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-700">คีย์ลัด:</span>
                      <input
                        value={inputHotkey}
                        onChange={(e) => setInputHotkey(e.target.value)}
                        placeholder="เช่น ww, 33, กป..."
                        className="w-28 px-2.5 py-1 bg-white border border-zinc-300 rounded text-xs font-mono font-bold text-zinc-900 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Text Slots (1, 2, 3) */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="w-24 text-zinc-700 font-semibold pt-1.5 shrink-0">ข้อความชุดที่ 1:</span>
                      <div className="flex-1 flex items-stretch gap-1">
                        <textarea
                          rows={2}
                          value={inputText1}
                          onChange={(e) => setInputText1(e.target.value)}
                          placeholder="กรอกข้อความชุดที่ 1 หรือ URL ปลายทาง..."
                          className="flex-1 p-2 bg-white border border-zinc-300 rounded text-xs text-zinc-900 outline-none focus:border-blue-500 resize-none font-sans"
                        />
                        <button
                          onClick={() => setInputText1('🖤🐼 📝 ลูกค้า สามารถ "พิมพ์" ชื่อ... บ้านเลข...')}
                          className="px-2 border border-zinc-300 rounded bg-[#F0F0F0] hover:bg-zinc-200 flex items-center justify-center"
                          title="ใส่ข้อความตัวอย่าง"
                        >
                          <Search className="w-3.5 h-3.5 text-zinc-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-24 text-zinc-700 font-semibold pt-1.5 shrink-0">ข้อความชุดที่ 2:</span>
                      <div className="flex-1 flex items-stretch gap-1">
                        <input
                          value={inputText2}
                          onChange={(e) => setInputText2(e.target.value)}
                          placeholder="กรอกข้อความชุดที่ 2 (ถ้ามี)..."
                          className="flex-1 px-2.5 py-1.5 bg-white border border-zinc-300 rounded text-xs text-zinc-900 outline-none focus:border-blue-500 font-sans"
                        />
                        <button
                          onClick={() => setInputText2('https://chatgpt.com')}
                          className="px-2 border border-zinc-300 rounded bg-[#F0F0F0] hover:bg-zinc-200 flex items-center justify-center"
                          title="ใส่ลิงก์ตัวอย่าง"
                        >
                          <Search className="w-3.5 h-3.5 text-zinc-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-24 text-zinc-700 font-semibold pt-1.5 shrink-0">ข้อความชุดที่ 3:</span>
                      <div className="flex-1 flex items-stretch gap-1">
                        <input
                          value={inputText3}
                          onChange={(e) => setInputText3(e.target.value)}
                          placeholder="กรอกข้อความชุดที่ 3 (ถ้ามี)..."
                          className="flex-1 px-2.5 py-1.5 bg-white border border-zinc-300 rounded text-xs text-zinc-900 outline-none focus:border-blue-500 font-sans"
                        />
                        <button
                          onClick={() => setInputText3('hotkey')}
                          className="px-2 border border-zinc-300 rounded bg-[#F0F0F0] hover:bg-zinc-200 flex items-center justify-center"
                          title="ใส่คำค้นหาตัวอย่าง"
                        >
                          <Search className="w-3.5 h-3.5 text-zinc-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-200">
                    <span className="w-24 text-zinc-700 font-semibold shrink-0">ค้นหาข้อมูล:</span>
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="พิมพ์ค้นหาคำตอบ คีย์ลัด หรือข้อความในตาราง..."
                      className="flex-1 px-3 py-1.5 bg-white border border-zinc-300 rounded text-xs text-zinc-900 outline-none focus:border-blue-500 font-sans"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="px-2 py-1 text-zinc-500 hover:text-zinc-800 text-xs"
                      >
                        ล้าง
                      </button>
                    )}
                  </div>

                  {/* Feedback Notification Banner */}
                  {simFeedbackMessage && (
                    <div className={`p-2.5 rounded text-xs font-semibold flex items-center gap-2 ${
                      simFeedbackMessage.type === 'success' ? 'bg-emerald-100 border border-emerald-300 text-emerald-800' :
                      simFeedbackMessage.type === 'error' ? 'bg-red-100 border border-red-300 text-red-800' :
                      'bg-blue-100 border border-blue-300 text-blue-800'
                    }`}>
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>{simFeedbackMessage.text}</span>
                    </div>
                  )}

                  {/* Data Grid Table (Image 1 replica) */}
                  <div className="border border-zinc-300 rounded overflow-hidden max-h-52 overflow-y-auto overflow-x-auto bg-white shadow-inner">
                    <table className="w-full min-w-[460px] text-left text-xs border-collapse">
                      <thead className="bg-[#F2F2F2] text-zinc-700 border-b border-zinc-300 sticky top-0 font-semibold">
                        <tr>
                          <th className="py-1.5 px-2.5 w-32 border-r border-zinc-300">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={tableData.length > 0 && tableData.every((r) => r.checked)}
                                onChange={toggleSelectAll}
                                className="rounded"
                              />
                              <span>คีย์ลัด (Hotke...</span>
                            </div>
                          </th>
                          <th className="py-1.5 px-3 border-r border-zinc-300">ข้อความชุดที่ 1</th>
                          <th className="py-1.5 px-3 border-r border-zinc-300 w-32">ข้อความชุดที่ 2</th>
                          <th className="py-1.5 px-3 w-32">ข้อความชุดที่ 3</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {filteredTableData.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-zinc-500">
                              ไม่พบข้อมูลที่ตรงกับคำค้นหา "{searchQuery}"
                            </td>
                          </tr>
                        ) : (
                          filteredTableData.map((row) => {
                            const isSelected = editingRowId === row.id;
                            return (
                              <tr
                                key={row.id}
                                onClick={() => handleSelectRow(row)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected
                                    ? 'bg-[#CCE8FF] text-zinc-950 font-medium'
                                    : 'hover:bg-zinc-50 text-zinc-800'
                                }`}
                              >
                                <td className="py-1.5 px-2.5 border-r border-zinc-200 font-mono font-bold">
                                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                    <input
                                      type="checkbox"
                                      checked={!!row.checked}
                                      onChange={() => toggleRowCheckbox(row.id)}
                                      className="rounded"
                                    />
                                    <span>{row.hotkey}</span>
                                  </div>
                                </td>
                                <td className="py-1.5 px-3 border-r border-zinc-200 truncate max-w-[280px]">
                                  {row.col1 || '-'}
                                </td>
                                <td className="py-1.5 px-3 border-r border-zinc-200 truncate max-w-[120px]">
                                  {row.col2 || '-'}
                                </td>
                                <td className="py-1.5 px-3 truncate max-w-[120px]">
                                  {row.col3 || '-'}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Bottom Action Control Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-300">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const nextState = !autoSendEnabled;
                          setAutoSendEnabled(nextState);
                          setSimFeedbackMessage({
                            text: nextState ? 'เปิดใช้งานระบบส่งออโต้แล้ว' : 'ปิดระบบส่งออโต้แล้ว',
                            type: nextState ? 'success' : 'info',
                          });
                          setTimeout(() => setSimFeedbackMessage(null), 2000);
                        }}
                        className={`px-3 py-1.5 rounded font-semibold border text-xs flex items-center gap-1.5 transition-all ${
                          autoSendEnabled
                            ? 'bg-zinc-900 text-white border-zinc-700 shadow-sm'
                            : 'bg-[#F0F0F0] hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${autoSendEnabled ? 'text-emerald-400' : 'text-zinc-400'}`} />
                        <span>{autoSendEnabled ? 'ส่งออโต้ (เปิดใช้งาน)' : 'ส่งออโต้ (ปิด)'}</span>
                      </button>

                      <button
                        onClick={() => setShowWebModal(true)}
                        className="px-3 py-1.5 bg-[#F0F0F0] hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>ตั้งค่าเว็บ</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleClearForm}
                        className="px-3 py-1.5 bg-[#F0F0F0] hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-semibold text-xs flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>เคลียร์</span>
                      </button>

                      <button
                        onClick={handleSaveEntry}
                        className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-md transition-all"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>บันทึก</span>
                      </button>

                      <button
                        onClick={handleDeleteEntry}
                        className="px-3.5 py-1.5 bg-[#D9534F] hover:bg-red-700 text-white font-bold rounded text-xs flex items-center gap-1 shadow-sm transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>ลบ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Allowed Websites Management Modal (Image 2 replica) */}
            {showWebModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-md border border-zinc-400 rounded-xl bg-white shadow-2xl overflow-hidden font-sans text-xs animate-in zoom-in-95 duration-200">
                  {/* Modal Title */}
                  <div className="bg-[#FAF0E6] px-4 py-2 border-b border-zinc-300 flex items-center justify-between">
                    <span className="font-bold text-zinc-900 text-sm">จัดการเว็บไซต์ที่อนุญาต</span>
                    <button
                      onClick={() => setShowWebModal(false)}
                      className="w-6 h-5 bg-[#D9534F] hover:bg-red-600 text-white font-bold flex items-center justify-center text-xs rounded-sm transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-4 sm:p-5 space-y-4 bg-[#FAFAFA]">
                    {/* Add URL keyword bar */}
                    <div>
                      <div className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5 mb-2">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>เพิ่มชื่อเว็บไซต์หรือคีย์เวิร์ดบนหัวข้อหน้าต่าง (Window Title):</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          value={newWebKeyword}
                          onChange={(e) => setNewWebKeyword(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddWebKeyword()}
                          placeholder="เช่น myorder, lazada, shopee, tiktok..."
                          className="flex-1 px-3 py-1.5 border-2 border-blue-500 rounded bg-white text-zinc-900 font-mono text-xs outline-none shadow-sm"
                        />
                        <button
                          onClick={handleAddWebKeyword}
                          className="px-3 py-1.5 bg-[#F0F0F0] hover:bg-zinc-200 border border-zinc-300 rounded text-zinc-800 font-bold flex items-center gap-1 text-xs transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> เพิ่มเว็บ
                        </button>
                      </div>
                    </div>

                    {/* Whitelist checklist box */}
                    <div>
                      <div className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5 mb-2">
                        <FileText className="w-3.5 h-3.5 text-zinc-600" />
                        <span>รายการคีย์เวิร์ดเว็บที่อนุญาตทั้งหมด ({allowedWebsites.length} รายการ):</span>
                      </div>

                      <div className="border border-zinc-300 rounded bg-white p-2.5 max-h-52 overflow-y-auto space-y-1.5 shadow-inner">
                        {allowedWebsites.length === 0 ? (
                          <div className="py-4 text-center text-zinc-400 text-xs">ยังไม่มีรายการคีย์เวิร์ดที่อนุญาต</div>
                        ) : (
                          allowedWebsites.map((w) => (
                            <label
                              key={w.id}
                              className="flex items-center gap-2 text-xs font-mono text-zinc-800 px-2 py-1 hover:bg-zinc-100 rounded cursor-pointer select-none transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={w.checked}
                                onChange={() =>
                                  setAllowedWebsites((prev) =>
                                    prev.map((item) =>
                                      item.id === w.id ? { ...item, checked: !item.checked } : item
                                    )
                                  )
                                }
                                className="rounded"
                              />
                              <span className="font-semibold">{w.keyword}</span>
                            </label>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Modal Footer Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                      <button
                        onClick={handleDeleteSelectedWeb}
                        className="px-3 py-1.5 bg-[#F0F0F0] hover:bg-red-50 border border-zinc-300 text-red-600 font-semibold rounded text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> ลบที่เลือก
                      </button>

                      <button
                        onClick={() => setShowWebModal(false)}
                        className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white font-bold rounded text-xs transition-colors shadow-sm"
                      >
                        ปิดหน้าต่าง
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Mock Footer Info */}
            <div className="z-10 text-center text-xs font-mono-code text-zinc-400 pt-2">
              FastKey Desktop Environment • Interactive Guide Engine
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALL 6 DETAILED STEP CARDS */}
      {activeTab === 'all_steps' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((st) => (
              <div
                key={st.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isDark ? 'bg-[#0E0E12] border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300'
                } shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white text-black font-mono-code font-extrabold text-xs shadow-sm">
                      {st.badge}
                    </span>
                    <span className="text-xs font-mono-code text-zinc-400">{st.timecode}</span>
                  </div>

                  <h3 className={`font-display text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                    {st.title}
                  </h3>

                  <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {st.shortDesc}
                  </p>

                  <div className="space-y-2 mb-4 pt-3 border-t border-white/5">
                    {st.fullDesc.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono-code text-zinc-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white shrink-0" />
                  <span className="truncate"><strong>Action:</strong> {st.keyAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
