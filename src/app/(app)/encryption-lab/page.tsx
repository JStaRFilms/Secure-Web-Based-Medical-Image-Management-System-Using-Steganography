'use client'

import React, { useState, useRef } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import { ArrowLeft, Moon, UploadCloud, Cpu, Image as ImageIcon, Download, CheckCircle } from 'lucide-react'
import FileUploader from '@/components/FileUploader'
import { cn } from '@/lib/utils'
import { GlobalSteganography } from '@/lib/steganography'
import { logAudit } from '@/app/actions/audit'

export default function EncryptionLabPage() {
    const [sourceImage, setSourceImage] = useState<File | null>(null)

    // Local state for the preview (URL)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [usePassword, setUsePassword] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [resultUrl, setResultUrl] = useState<string | null>(null)

    const handleFileSelect = (file: File) => {
        setSourceImage(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setResultUrl(null)
    }

    const handleEncode = async () => {
        if (!sourceImage || !message) return
        setIsProcessing(true)

        try {
            // 1. Load Image
            const imgBitmap = await createImageBitmap(sourceImage)
            const canvas = document.createElement('canvas')
            canvas.width = imgBitmap.width
            canvas.height = imgBitmap.height
            const ctx = canvas.getContext('2d')

            if (!ctx) throw new Error('Could not get canvas context')

            ctx.drawImage(imgBitmap, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

            // 2. Encode
            // Note: This operation effectively blocks the main thread.
            // For large images, we definitely need the WASM/Worker upgrade.
            const finalPassword = usePassword ? password : undefined
            const newImageData = await GlobalSteganography.encode(imageData, message, finalPassword)
            ctx.putImageData(newImageData, 0, 0)

            // 3. Export
            canvas.toBlob(async (blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob)
                    setResultUrl(url)

                    // Audit Log
                    await logAudit('ENCRYPT_OP', sourceImage.name)
                }
                setIsProcessing(false)
            }, 'image/png')

        } catch (error) {
            console.error("Encryption Failed:", error)
            alert("Encryption Failed. Message might be too long for this image.")
            setIsProcessing(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Nav was inside the page in mockup, but we have a shared structure now.
            However, the mockup shows a specific "Encryption Lab" header with a back button.
            Our global Sidebar handles navigation.
            But the mockup has a specific "Back to Dashboard" button in the Layout?
            Let's stick to the mockup's "Workspace" feel.
            We can override the default Header or just render a custom top bar here if we wanted to hide the sidebar?
            Mockup shows Sidebar is DIFFERENT or GONE?
            Wait, encryption-lab.html:
            Line 63: "Tools Panel (Left) ... w-96"
            Line 46: Nav "Encryption Lab" with Back Arrow to Dashboard.
            Line 60: Main Workspace.

            It seems the "Lab" mode consumes the whole screen in the mockup,
            potentially replacing the Sidebar?
            "dashboard.html" has the sidebar. "encryption-lab.html" does NOT show the main sidebar in the markup I read?
            Let's re-read encryption-lab.html content (Step 64).
            Yes, it has a <nav> at the top and then <main> flex-row. No <aside> for global nav.
            Current (app) layout HAS sidebar.

            DECISION: The "Lab" views are "Immersive". They should probably NOT have the global sidebar.
            OR we keep the sidebar for consistency (User Experience best practice).
            BUT User said "Match Mockups Exactly".
            Mockup implies a full-screen mode for Labs.

            I will use a Route Group (lab) for these pages to opt-out of the Sidebar layout if needed?
            Or I can just hide the sidebar in CSS?

            Actually, the best way to match "Exactly" is to have a separate layout for Labs.
            I will put encryption-lab and decryption-lab in a separate route group `(lab)`
            that does NOT use the dashboard sidebar layout.

            Refactoring plan:
            Move `(app)/dashboard` -> `(app)/(dashboard)/dashboard` ?
            Or make `(app)` hold the sidebar, and move labs OUT of `(app)`?
            But labs need Auth.

            Let's make `src/app/(lab)/layout.tsx` which is just a simple wrapper,
            and `src/app/(dashboard)/layout.tsx` which has the Sidebar.
            and both are inside `src/app/layout.tsx` (Shared Auth check?).

            For now, I'll implement the page content assuming it fits in the current `(app)` layout
            BUT I'll conditionally hide sidebar? No that's hacky.

            I will move `dashboard` into a group `(main)` inside `(app)` that has the Sidebar.
            And `encryption-lab` into a group `(immersive)` inside `(app)` that does NOT.

            Actually, let's just make the page content first, and if the sidebar is there, it's there.
            The user might accept the Sidebar as an "improvement" / consistency.
            However, strictly "Match Mockup" means no Sidebar on Lab.

            Let's implement the page content. I will render the "Nav Stub" from the mockup as the Header.
        */}

            {/* Custom Nav for this immersive view (if we can hide sidebar)
          If sidebar is present, this double nav might look weird.
          I will stick to the content of the mockup.
      */}
            <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 h-16 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <span className="font-bold tracking-tight">Encryption Lab</span>
                </div>
            </nav>

            <main className="flex-1 flex overflow-hidden">
                {/* Tools Panel (Left) */}
                <aside className="w-96 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col overflow-y-auto">

                    {/* Step 1 */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs">1</span>
                            Source Image
                        </h3>
                        <FileUploader onFileSelect={handleFileSelect} />
                    </div>

                    {/* Step 2 */}
                    <div className="mb-8 flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs">2</span>
                            Diagnosis Payload
                        </h3>
                        <div className="relative h-48">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full h-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 resize-none"
                                placeholder="Enter patient diagnosis, markers, or private medical notes here..."
                            ></textarea>
                            <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">{message.length} chars</div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                                <input type="checkbox" className="rounded text-blue-600 dark:text-cyan-500 focus:ring-offset-0" />
                                <span className="text-sm font-medium">Compress Payload (Auto)</span>
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={usePassword}
                                        onChange={(e) => setUsePassword(e.target.checked)}
                                        className="rounded text-blue-600 dark:text-cyan-500 focus:ring-offset-0"
                                    />
                                    <span className="text-sm font-medium">Add Password Protection</span>
                                </label>

                                {usePassword && (
                                    <div className="animate-in fade-in slide-in-from-top-2 ml-1">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter secure password"
                                            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleEncode}
                        disabled={!sourceImage || !message || isProcessing}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-2",
                            isProcessing || !sourceImage || !message
                                ? "bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700"
                        )}
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ENCODING...
                            </>
                        ) : (
                            <>
                                <Cpu className="w-5 h-5" />
                                ENCODE DATA
                            </>
                        )}
                    </button>
                </aside>

                {/* Preview Panel (Right) */}
                <section className="flex-1 bg-slate-50 dark:bg-zinc-950 p-8 flex items-center justify-center relative overflow-hidden">
                    {/* Grid BG */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

                    {previewUrl ? (
                        <div className="relative max-w-2xl w-full flex flex-col items-center gap-6">
                            <div className="relative aspect-[4/3] bg-black rounded shadow-2xl overflow-hidden border border-zinc-800 w-full">
                                <img src={previewUrl} alt="Medical Scan" className="w-full h-full object-contain opacity-80" />

                                {isProcessing && (
                                    <div className="absolute inset-0 bg-cyan-500/10 w-full h-2 animate-scan shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
                                )}
                            </div>

                            {resultUrl && (
                                <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex items-center gap-2 text-green-600 dark:text-emerald-500 font-bold bg-green-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full mb-2">
                                        <CheckCircle className="w-5 h-5" /> Encryption Successful
                                    </div>
                                    <a
                                        href={resultUrl}
                                        download={`encrypted_${sourceImage?.name}`}
                                        className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 px-8 py-3 rounded-xl font-medium shadow hover:scale-105 transition-transform flex items-center gap-2"
                                    >
                                        <Download className="w-5 h-5" /> Download Secure PNG
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center text-slate-400 dark:text-zinc-600">
                            <ImageIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
                            <p className="font-mono text-sm">WAITING FOR IMAGE SOURCE...</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}
