import Link from 'next/link'
import { ShieldCheck, Lock, PlayCircle } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 min-h-screen font-sans transition-colors duration-300 overflow-x-hidden">

      {/* Theme Toggle - Fixed */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 dark:bg-cyan-600 rounded flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-lg">
              BigSam<span className="text-slate-400 dark:text-zinc-500">Stego</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-zinc-400">
            <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
              How it Works
            </Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
              Security
            </Link>
            <Link
              href="/sign-in"
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700 px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20"
            >
              System Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative pt-24 pb-32 overflow-hidden">
        {/* Grid BG */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 dark:bg-cyan-900/20 dark:border-cyan-900/30 dark:text-cyan-400 text-xs font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-cyan-500"></span>
            </span>
            V1.0 SYSTEM OPERATIONAL
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-zinc-500">
            Medical Privacy,<br />
            <span className="text-blue-600 dark:text-cyan-400">Invisible</span> to the Naked Eye.
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Securely embed sensitive patient diagnoses directly into medical imagery using advanced{' '}
            <span className="text-slate-900 dark:text-zinc-200 font-medium">LSB Steganography</span>. No database leaks.
            No paper trails.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700 px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-xl shadow-blue-500/20 dark:shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" /> Start Encrypting
            </Link>
            <Link
              href="#"
              className="w-full md:w-auto px-8 py-4 rounded-xl font-medium text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" /> View Demo
            </Link>
          </div>
        </div>
      </main>

      {/* Steps */}
      <section className="border-t border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-sm relative group overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 dark:group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-xl">01</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Upload Image</h3>
            <p className="text-slate-600 dark:text-zinc-400">
              Select a standard medical X-Ray or Scan (PNG/JPG). Our client-side engine prepares it for encoding.
            </p>
          </div>
          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-sm relative group overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 dark:group-hover:bg-indigo-500/20 transition-all"></div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6">
              <span className="text-purple-600 dark:text-indigo-400 font-mono font-bold text-xl">02</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Embed Data</h3>
            <p className="text-slate-600 dark:text-zinc-400">
              Type the diagnosis or upload a text file. The system alters the Least Significant Bits of the pixels.
            </p>
          </div>
          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-sm relative group overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 dark:group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="w-12 h-12 bg-green-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6">
              <span className="text-green-600 dark:text-emerald-400 font-mono font-bold text-xl">03</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Download Securely</h3>
            <p className="text-slate-600 dark:text-zinc-400">
              Receive the engineered PNG. Visually identical to the original, but holding the secret payload.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
