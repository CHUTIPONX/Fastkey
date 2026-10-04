import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Download, Github, Menu, ShieldCheck, X, Zap } from 'lucide-react';

const googleDriveUrl = 'https://drive.google.com/drive/u/0/folders/1PufiPZax-6bnuSh7OF5qrux7Cc6sdXtF';
const virusTotalUrl = 'https://www.virustotal.com/gui/file/6ae4fedef470f68b6fc0850979b014d7f00922000c6ea617cfe3e0bfa67db5e0?nocache=1';
const githubUrl = 'https://github.com/CHUTIPONX/Fastkey';
const sha256 = '6ae4fedef470f68b6fc0850979b014d7f00922000c6ea617cfe3e0bfa67db5e0';

const features = [
  ['Lightning fast', 'Instant hotkeys and low-latency actions without a heavy desktop suite.', Zap],
  ['Simple by design', 'Create shortcuts, manage profiles, and keep your workflow focused.', Check],
  ['Portable', 'Run FastKey.exe directly. No installer or complicated setup required.', Download],
  ['Privacy first', 'Your profiles and shortcuts stay on your Windows machine.', ShieldCheck],
] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(sha256);
      setCopied(true);
      notify('SHA-256 copied');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      notify('Unable to copy checksum');
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <button onClick={() => goTo('home')} className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#111827] text-xs font-black text-white">FK</span>
            <span>FastKey</span>
            <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 sm:inline">v2.4</span>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-slate-500 md:flex">
            {[
              ['Features', 'features'],
              ['Download', 'download'],
              ['Docs', 'docs'],
            ].map(([label, id]) => (
              <button key={id} onClick={() => goTo(id)} className="transition-colors hover:text-slate-950">{label}</button>
            ))}
            <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-950">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => goTo('download')} className="hidden rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-black sm:inline-flex">Download</button>
            <button onClick={() => setMenuOpen((v) => !v)} aria-label="Open menu" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white md:hidden">
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm">
              <button onClick={() => goTo('features')} className="text-left text-slate-600">Features</button>
              <button onClick={() => goTo('download')} className="text-left text-slate-600">Download</button>
              <button onClick={() => goTo('docs')} className="text-left text-slate-600">Docs</button>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="text-left text-slate-600">GitHub</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Windows 10 / 11 · x64
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-7xl">Your shortcuts.<br />Made fast.</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">FastKey is a lightweight Windows utility for hotkeys, quick text, and repeatable actions. Simple enough to set up in minutes, fast enough to stay out of your way.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={() => goTo('download')} className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black">
                  <Download className="h-4 w-4" /> Download for Windows <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => goTo('docs')} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Read docs</button>
              </div>
              <div className="mt-7 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">Portable</span>
                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">Lightweight</span>
                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">Local profiles</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[36px] bg-sky-100/70 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><span className="grid h-5 w-5 place-items-center rounded bg-slate-900 text-[8px] font-black text-white">FK</span> FastKey</div>
                  <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-300"/><span className="h-2 w-2 rounded-full bg-slate-300"/><span className="h-2 w-2 rounded-full bg-slate-300"/></div>
                </div>
                <div className="grid min-h-[360px] grid-cols-[150px_1fr]">
                  <aside className="border-r border-slate-200 bg-slate-50 p-3">
                    {['Quick actions','Profiles','Hotkeys','Settings'].map((item, i) => (
                      <div key={item} className={`mb-1 rounded-lg px-3 py-2 text-xs ${i === 0 ? 'bg-white font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500'}`}>{item}</div>
                    ))}
                    <div className="mt-16 rounded-lg border border-slate-200 bg-white p-3 text-[10px] text-slate-500">Engine<br/><span className="mt-1 block text-emerald-600">● Running</span></div>
                  </aside>
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div><div className="text-sm font-semibold text-slate-900">Quick actions</div><div className="mt-1 text-[11px] text-slate-400">Your frequently used shortcuts</div></div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">0.38ms</span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        ['Ctrl + 1','Open profile'], ['Alt + Space','Command palette'], ['ww','Insert template']
                      ].map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between rounded-xl border border-slate-200 px-3.5 py-3">
                          <div className="text-xs font-medium text-slate-700">{label}</div>
                          <kbd className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-600">{key}</kbd>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.14em] text-slate-400"><span>Activity</span><span>Live</span></div>
                      <div className="mt-4 flex h-12 items-end gap-1.5">
                        {[18,28,20,36,26,44,32,52,28,40,35,48,30,56,40,46].map((h,i)=><span key={i} style={{height:`${h}%`}} className="w-2 rounded-full bg-slate-300"/>) }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-lg">Built for everyday workflows</div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-slate-200 bg-white/70">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Features</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Everything you need.<br/>Nothing you don't.</h2>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([title, body, Icon]) => (
                <div key={title} className="bg-white p-6">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100"><Icon className="h-4 w-4 text-slate-700" /></div>
                  <h3 className="mt-5 text-sm font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="download" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-2xl bg-[#111827] p-7 text-white sm:p-9">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Download</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">FastKey for Windows</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">Portable executable. Download, open, and start creating shortcuts.</p>
              <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-full border border-white/10 px-3 py-1.5">v2.4.0</span><span className="rounded-full border border-white/10 px-3 py-1.5">Windows 10 / 11</span><span className="rounded-full border border-white/10 px-3 py-1.5">x64</span></div>
              <a href="https://github.com/CHUTIPONX/Fastkey/raw/refs/heads/main/public/FastKey.exe" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"><Download className="h-4 w-4"/> Download FastKey.exe</a>
              <div className="mt-5 text-xs text-slate-400">Need the video or PDF guide? <a href={googleDriveUrl} target="_blank" rel="noreferrer" className="text-white underline underline-offset-2">Open Google Drive</a></div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><ShieldCheck className="h-4 w-4 text-emerald-600"/> Verify the file</div>
              <p className="mt-3 text-sm leading-6 text-slate-500">Check the SHA-256 checksum before running the executable.</p>
              <button onClick={copyHash} className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left font-mono text-[10px] leading-5 text-slate-600 transition hover:bg-slate-100">
                {copied ? 'Copied' : sha256}
              </button>
              <a href={virusTotalUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 underline underline-offset-2">VirusTotal report <ArrowRight className="h-3 w-3"/></a>
            </div>
          </div>
        </section>

        <section id="docs" className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Quick start</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">Ready in three steps.</h2>
              </div>
              <div className="space-y-3">
                {[
                  ['01','Download','Get FastKey.exe and open it directly.'],
                  ['02','Create a profile','Add hotkeys and the messages you use most.'],
                  ['03','Use your shortcuts','Press the hotkey and keep working.'],
                ].map(([num,title,body]) => (
                  <div key={num} className="grid grid-cols-[44px_1fr] gap-4 rounded-xl border border-slate-200 p-4">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 font-mono text-[11px] font-semibold text-slate-600">{num}</div>
                    <div><div className="text-sm font-semibold text-slate-900">{title}</div><div className="mt-1 text-sm leading-6 text-slate-500">{body}</div></div>
                  </div>
                ))}
                <a href={githubUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">View source on GitHub <ArrowRight className="h-4 w-4"/></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-[#f6f7f9]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div><div className="font-semibold text-slate-900">FastKey</div><div className="mt-1 text-xs">A small utility for faster Windows workflows.</div></div>
          <div className="flex items-center gap-5 text-xs"><a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900">GitHub</a><a href={virusTotalUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900">VirusTotal</a></div>
        </div>
      </footer>
    </div>
  );
}
