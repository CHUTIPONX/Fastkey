import React, { useState } from 'react';

const DOWNLOAD_URL = 'https://github.com/CHUTIPONX/Fastkey/raw/refs/heads/main/public/Fastkey.exe';
const SHA256_HASH = '4bf4af9afe65dbd3e15ff48c3ec4c9b8c89fda89a13945f6807a45ed774ee275';

type MockupTab = 'quick-actions' | 'hotkey-matrix' | 'system-hooks' | 'preferences';

const navItems = [
  ['home', 'Home'],
  ['features', 'Features'],
  ['download', 'Download'],
  ['how-to-use', 'How to Use'],
  ['changelog', 'Changelog'],
  ['documentation', 'GitHub'],
] as const;

function scrollToSection(id: string, setActive: (value: string) => void) {
  setActive(id);
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <span className={'material-symbols-outlined ' + className}>{name}</span>;
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeTab, setActiveTab] = useState<MockupTab>('quick-actions');
  const [interceptor, setInterceptor] = useState(true);
  const [palette, setPalette] = useState(true);
  const [snapping, setSnapping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const showDownload = () => {
    window.location.assign(DOWNLOAD_URL);
  };

  const copySha = async () => {
    try {
      await navigator.clipboard.writeText(SHA256_HASH);
      setCopied(true);
      notify('SHA-256 copied to clipboard');
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      notify('Copy is unavailable in this browser');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-body-md selection:bg-slate-900 selection:text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-sky-200/50 blur-[150px]" />
        <div className="absolute right-[-12%] top-[34%] h-[520px] w-[680px] rounded-full bg-indigo-100/45 blur-[150px]" />
        <div className="absolute bottom-[-18%] left-[4%] h-[560px] w-[760px] rounded-full bg-sky-100/60 blur-[150px]" />
        <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-400 align-middle" />
          {toast}
        </div>
      )}

      <div className="mx-auto my-6 w-[94%] max-w-[1360px] overflow-hidden rounded-[32px] border border-white/80 bg-white/80 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200/70 bg-white/80 px-5 backdrop-blur-xl sm:px-8">
          <button
            onClick={() => scrollToSection('home', setActiveNav)}
            className="flex items-center gap-3 text-left"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-xs font-bold text-sky-300 shadow-sm">
              FK
            </div>
            <div>
              <div className="font-headline-md font-bold tracking-tight">Fastkeyx</div>
              <div className="hidden font-label-mono-sm text-slate-500 sm:block">v1.0.0 • Win 11 / 10</div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 lg:flex">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id, setActiveNav)}
                className={activeNav === id ? 'font-semibold text-slate-950' : 'transition-colors hover:text-slate-950'}
              >
                {label}
              </button>
            ))}
          </nav>

          <a
            href="#download"
            onClick={() => scrollToSection('download', setActiveNav)}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-black"
          >
            Download
          </a>
        </header>

        <main className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <section id="home" className="scroll-mt-28">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1.5 font-label-mono-sm font-semibold uppercase tracking-wider text-slate-800">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
                  Windows Application
                </div>

                <div className="flex items-end gap-3">
                  <h1 className="font-display-hero text-display-hero-mobile sm:text-display-hero text-slate-950">
                    Fastkeyx
                  </h1>
                  <span className="mb-2 rounded-full bg-slate-900 px-2.5 py-1 font-label-mono-sm font-medium text-white">
                    v1.0.0
                  </span>
                </div>

                <h2 className="mt-4 max-w-xl font-headline-lg font-semibold leading-tight text-slate-900">
                  Your fast, simple and powerful Windows utility.
                </h2>
                <p className="mt-4 max-w-xl font-body-lg text-slate-600">
                  Engineered to streamline modern Windows workflows with low-latency hotkeys,
                  compact controls and a clean desktop-first experience.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={showDownload}
                    className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-7 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-black"
                  >
                    <Icon name="download" className="text-[20px]" />
                    Install on Windows
                  </button>
                  <button
                    onClick={() => scrollToSection('features', setActiveNav)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                  >
                    <Icon name="tune" className="text-[19px] text-sky-600" />
                    View Features
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 font-label-mono-sm text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Windows 11 / 10</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">x64 Native</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Desktop Shortcut Included</span>
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sky-800">Portable</span>
                </div>
              </div>

              <div className="relative lg:col-span-6">
                <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-tr from-sky-300/20 via-blue-100/25 to-transparent blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950 shadow-[0_26px_65px_rgba(15,23,42,0.28)]">
                  <div className="flex h-11 items-center justify-between border-b border-slate-700/70 bg-slate-800/90 px-4">
                    <div className="flex items-center gap-2.5 text-sm text-slate-200">
                      <div className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-tr from-sky-400 to-blue-500 text-[9px] font-bold text-slate-950">FK</div>
                      Fastkeyx — v1.0.0
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Icon name="minimize" className="text-[16px]" />
                      <Icon name="crop_square" className="text-[15px]" />
                      <Icon name="close" className="text-[17px]" />
                    </div>
                  </div>

                  <div className="grid min-h-[370px] grid-cols-12">
                    <aside className="col-span-4 border-r border-slate-800 bg-slate-900/80 p-3">
                      <div className="space-y-1">
                        {([
                          ['quick-actions', 'bolt', 'Quick Actions'],
                          ['hotkey-matrix', 'keyboard', 'Hotkey Matrix'],
                          ['system-hooks', 'terminal', 'System Hooks'],
                          ['preferences', 'settings', 'Preferences'],
                        ] as const).map(([key, icon, label]) => (
                          <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={
                              activeTab === key
                                ? 'flex w-full items-center gap-2.5 rounded-lg border border-sky-400/20 bg-sky-500/20 px-3 py-2 text-left text-xs font-medium text-sky-300'
                                : 'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                            }
                          >
                            <Icon name={icon} className="text-[16px]" />
                            {label}
                          </button>
                        ))}
                      </div>
                      <div className="mt-8 rounded-lg border border-slate-700/50 bg-slate-800/60 p-2.5">
                        <div className="flex justify-between font-label-mono-sm text-[10px] text-slate-400">
                          <span>DAEMON</span><span className="text-sky-400">RUNNING</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-950">
                          <div className="h-full w-[14%] rounded-full bg-sky-400" />
                        </div>
                        <div className="mt-1 font-label-mono-sm text-[10px] text-slate-400">0.8% CPU • 18MB RAM</div>
                      </div>
                    </aside>

                    <div className="col-span-8 p-4">
                      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
                            Hook Engine: Armed
                          </div>
                          <div className="mt-0.5 font-label-mono-sm text-[11px] text-slate-400">Avg latency: 0.38ms</div>
                        </div>
                        <span className="rounded-md border border-sky-400/30 bg-sky-400/20 px-2 py-0.5 font-label-mono-sm text-[11px] text-sky-300">ACTIVE</span>
                      </div>

                      <div className="mt-3 space-y-2">
                        {([
                          ['Global Key Interceptor', interceptor, setInterceptor, 'keyboard_command_key'],
                          ['Command Palette', palette, setPalette, 'search'],
                          ['Smart Window Snapping', snapping, setSnapping, 'splitscreen'],
                        ] as const).map(([label, value, setter, icon]) => (
                          <button
                            key={label}
                            onClick={() => setter(!value)}
                            className="flex w-full items-center justify-between rounded-lg border border-slate-800/70 bg-slate-900/60 p-2.5 text-left"
                          >
                            <span className="flex items-center gap-2.5 text-xs text-slate-200">
                              <Icon name={icon} className="text-[18px] text-sky-400" />
                              {label}
                            </span>
                            <span className={'flex h-5 w-9 items-center rounded-full p-0.5 ' + (value ? 'justify-end bg-sky-500' : 'justify-start bg-slate-700')}>
                              <span className={'h-4 w-4 rounded-full ' + (value ? 'bg-white' : 'bg-slate-400')} />
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
                        <div>
                          <div className="font-label-mono-sm text-[10px] uppercase tracking-wider text-slate-400">Event Intercept Graph</div>
                          <div className="font-label-mono-sm text-[11px] text-sky-400">0.4ms dispatch</div>
                        </div>
                        <svg className="h-6 w-36 overflow-visible fill-none stroke-sky-400" viewBox="0 0 144 24">
                          <path d="M0 16 L20 16 L26 4 L34 22 L40 16 L70 16 L78 6 L84 20 L92 16 L120 16 L128 8 L134 18 L144 16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-3 -top-3 hidden rounded-2xl border border-slate-200 bg-white/90 px-3.5 py-2 shadow-xl backdrop-blur sm:flex sm:items-center sm:gap-2.5">
                  <span>⚡</span><div><div className="font-label-mono-sm text-[10px] font-semibold text-sky-600">FAST</div><div className="text-xs font-semibold">Sub-0.5ms</div></div>
                </div>
                <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-slate-200 bg-white/90 px-3.5 py-2 shadow-xl backdrop-blur sm:flex sm:items-center sm:gap-2.5">
                  <span>🪶</span><div><div className="font-label-mono-sm text-[10px] font-semibold text-sky-600">LIGHTWEIGHT</div><div className="text-xs font-semibold">&lt;18 MB RAM</div></div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="mt-24 scroll-mt-28">
            <div className="mx-auto max-w-2xl text-center">
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 font-label-mono-sm font-semibold text-slate-800">CORE ARCHITECTURE</span>
              <h2 className="mt-4 font-headline-xl font-bold tracking-tight">Why Fastkeyx</h2>
              <p className="mt-2 font-body-lg text-slate-600">Engineered for speed, clarity and daily workflows without compromise.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['speed', 'Fast & Lightweight', 'Responsive controls with low background overhead.', '< 0.5ms execution'],
                ['filter_center_focus', 'Simple', 'Clean controls without unnecessary menus or configuration noise.', 'Zero configuration setup'],
                ['widgets', 'Powerful', 'Hotkeys, macros and system actions in one cohesive desktop tool.', 'Multi-key pipeline'],
                ['desktop_windows', 'Windows Ready', 'Designed for modern Windows with native desktop behavior.', 'Windows 11 / 10'],
              ].map(([icon, title, body, foot]) => (
                <article key={title} className="rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-slate-900 text-white">
                    <Icon name={icon} className="text-[23px]" />
                  </div>
                  <h3 className="font-headline-md font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                  <div className="mt-6 font-label-mono-sm font-medium text-sky-700">{foot} →</div>
                </article>
              ))}
            </div>
          </section>

          <section id="download" className="relative mx-auto mt-24 max-w-5xl scroll-mt-28">
            <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-sky-200/50 via-blue-100/40 to-indigo-100/40 blur-xl" />
            <div className="relative rounded-[32px] border border-slate-200 bg-white/90 p-7 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-label-mono-sm font-semibold text-slate-800">
                <Icon name="verified" className="text-[15px] text-sky-600" />
                STABLE PRODUCTION BUILD
              </span>
              <h2 className="mt-4 font-headline-xl font-bold tracking-tight">Install Fastkeyx</h2>
              <p className="mx-auto mt-2 max-w-md font-body-lg text-slate-600">Install Fastkeyx and create a desktop shortcut automatically.</p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['Version', 'v1.0.0'],
                  ['Platform', 'Windows'],
                  ['Architecture', '64-bit'],
                  ['Package', 'Fastkey.exe'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5">
                    <div className="font-label-mono-sm uppercase text-slate-500">{label}</div>
                    <div className="mt-1 font-label-mono-md font-bold">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={showDownload}
                  className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-9 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 hover:bg-black"
                >
                  <Icon name="download" className="text-[23px]" />
                  Download Fastkeyx
                </button>
              </div>


              <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3 border-t border-slate-200 pt-5 font-label-mono-sm text-xs text-slate-600">
                <span>Windows Application</span><span>•</span><span>Free Download</span><span>•</span>
                <button onClick={copySha} className="inline-flex items-center gap-1 hover:text-slate-950">
                  {copied ? 'SHA-256 Copied!' : 'SHA-256: ' + SHA256_HASH.slice(0, 8) + '…'}
                  <Icon name={copied ? 'check' : 'content_copy'} className="text-[13px]" />
                </button>
              </div>
            </div>
          </section>

          <section id="how-to-use" className="mt-24 scroll-mt-28">
            <div className="mx-auto max-w-2xl text-center">
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-label-mono-sm font-semibold">
                COMING SOON
              </span>
              <h2 className="mt-4 font-headline-xl font-bold tracking-tight">How to Use</h2>
              <p className="mt-2 font-body-lg text-slate-600">Documentation and hotkey mapping guides are being prepared.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                ['01', 'Installation & Setup', 'Launch the portable executable and optionally add it to Windows startup.'],
                ['02', 'Configure Hotkeys', 'Create shortcuts, remap modifiers and attach actions to your daily apps.'],
                ['03', 'Advanced Macros', 'Chain text, clipboard and shell actions into fast repeatable workflows.'],
              ].map(([num, title, body]) => (
                <article key={num} className="rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 font-label-mono-md font-bold text-white">{num}</div>
                  <h3 className="mt-4 font-headline-md font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="changelog" className="mx-auto mt-24 max-w-4xl scroll-mt-28">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-headline-xl font-bold tracking-tight">Changelog</h2>
                <p className="mt-1 text-sm text-slate-600">Release history and runtime notes.</p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-label-mono-sm font-semibold">TRACK: MAIN</span>
            </div>

            <article className="mt-7 rounded-2xl border border-slate-200 bg-white/85 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
                <div className="flex items-center gap-3">
                  <span className="font-headline-md font-bold">v1.0.0</span>
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 font-label-mono-sm font-medium text-white">Latest</span>
                </div>
                <span className="font-label-mono-sm text-slate-500">Windows 11 / 10</span>
              </div>
              <h3 className="mt-6 font-headline-md font-semibold">Initial Release</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fastkeyx introduces a lightweight desktop utility workflow centered around low-latency keyboard hooks and simple hotkey controls.
              </p>
              <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                {[
                  'Low-latency background keyboard hook engine',
                  'Shortcut and macro management',
                  'Compact memory footprint',
                  'Windows desktop-first experience',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 text-[18px] text-sky-600" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-slate-200 pt-4 font-label-mono-sm text-xs text-slate-500">
                Fastkeyx.exe • Size: 1.5 MB • SHA256: {SHA256_HASH}
              </div>
            </article>
          </section>

          <section id="documentation" className="mx-auto mt-24 max-w-4xl scroll-mt-28">
            <div className="flex flex-col items-start justify-between gap-7 rounded-2xl border border-slate-200 bg-white/85 p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center">
              <div className="flex items-center gap-5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white">
                  <Icon name="code" className="text-[26px]" />
                </div>
                <div>
                  <h3 className="font-headline-md font-semibold">Fastkeyx on GitHub</h3>
                  <p className="mt-1 max-w-xl text-sm text-slate-600">Follow development, inspect releases and browse the source repository.</p>
                </div>
              </div>
              <a
                href="https://github.com/CHUTIPONX/Fastkey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 font-semibold text-white hover:bg-black"
              >
                View on GitHub
                <Icon name="open_in_new" className="text-[17px]" />
              </a>
            </div>
          </section>
        </main>

        <footer className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 bg-slate-50/80 px-6 py-7 text-xs text-slate-500 sm:flex-row sm:px-8">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-900">Fastkeyx</span>
            <span>Windows utility software</span>
          </div>
          <div className="flex items-center gap-5 font-label-mono-sm">
            <span className="flex items-center gap-2 text-sky-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
              Engine v2.4.0 Live
            </span>
            <button onClick={() => scrollToSection('changelog', setActiveNav)} className="hover:text-slate-950">Release Hashes</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
