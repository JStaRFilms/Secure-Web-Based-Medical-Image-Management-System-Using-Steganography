'use client'

import { useRef, useState } from 'react'
import { UploadCloud, Cpu, Image as ImageIcon, ArrowLeft, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { encodeLSB } from '@/features/steganography/utils/lsb'
import { logEvent } from '@/actions/audit'

export default function EncryptionLab() {
    const [sourceImage, setSourceImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [payload, setPayload] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [encryptedImage, setEncryptedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSourceImage(file)
            setPreviewUrl(URL.createObjectURL(file))
            setEncryptedImage(null)
        }
    }

    const handleEncode = async () => {
        if (!sourceImage || !payload) return
        setIsProcessing(true)

        // Artificial delay for "Scanning" effect if it's too fast
        await new Promise(resolve => setTimeout(resolve, 1500))

        try {
            const result = await encodeLSB(sourceImage, payload)
            setEncryptedImage(result)
            await logEvent('ENCRYPT', sourceImage.name)
        } catch (error) {
            console.error(error)
            alert("Encryption failed: " + (error as Error).message)
        } finally {
            setIsProcessing(false)
        }
    }

    const downloadImage = () => {
        if (!encryptedImage) return
        const link = document.createElement('a')
        link.href = encryptedImage
        link.download = `protected_${sourceImage?.name.replace(/\.[^/.]+$/, "")}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Nav is in layout, but mockup shows specific sub-nav. 
          Since we have a Global Layout, we might override or just put this content in Main.
          The mockup has a full page structure with its own Nav. 
          But our Layout has Sidebar + Header.
          The Route structure is /encryption-lab inside (app) layout.
          If I want to match mockup exactly, I should hide the Sidebar/Header?
          Mockup has "Encryption Lab" header and Back button.
          Our Layout has "Command Center".
          The Mockup implies a "Fullscreen Tool" mode.
          I'll implement the Mockup's Nav as a sub-header or use the Layout's header.
          Actually, the Mockup's Nav replaces the App Layout's Header maybe?
          I will render the Mockup's content INSIDE the <main> of App Layout.
          So "Nav Stub" becomes the top bar of this page.
      */}

            <div className="flex-1 flex overflow-hidden">
                {/* Tools Panel (Left) */}
                <aside className="w-96 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col overflow-y-auto">

                    {/* Header specific to Lab */}
                    <div className="mb-6 flex items-center gap-3">
                        <Link href="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="font-bold tracking-tight text-lg">Encryption Lab</h1>
                    </div>

                    {/* Step 1: Upload */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs">1</span>
                            Source Image
                        </h3>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-cyan-500 transition-colors cursor-pointer bg-slate-50 dark:bg-zinc-950/50"
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg"
                            />
                            <UploadCloud className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                            <p className="text-sm font-medium">{sourceImage ? sourceImage.name : "Drop X-Ray or Scan"}</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG only</p>
                        </div>
                    </div>

                    {/* Step 2: Payload */}
                    <div className="mb-8 flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs">2</span>
                            Diagnosis Payload
                        </h3>
                        <div className="relative h-48">
                            <textarea
                                value={payload}
                                onChange={(e) => setPayload(e.target.value)}
                                className="w-full h-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 resize-none"
                                placeholder="Enter patient diagnosis, markers, or private medical notes here..."
                            ></textarea>
                            <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">{payload.length} chars</div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                                <input type="checkbox" className="rounded text-blue-600 dark:text-cyan-500 focus:ring-offset-0" />
                                <span className="text-sm font-medium">Compress Payload</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                                <input type="checkbox" className="rounded text-blue-600 dark:text-cyan-500 focus:ring-offset-0" />
                                <span className="text-sm font-medium">Add Password Protection</span>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleEncode}
                        disabled={!sourceImage || !payload || isProcessing}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 ${(!sourceImage || !payload || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Cpu className="w-5 h-5" />
                        {isProcessing ? 'ENCODING...' : 'ENCODE DATA'}
                    </button>
                </aside>

                {/* Preview Panel (Right) */}
                <section className="flex-1 bg-slate-50 dark:bg-zinc-950 p-8 flex items-center justify-center relative overflow-hidden">
                    {/* Grid BG */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

                    {!previewUrl ? (
                        <div className="text-center text-slate-400 dark:text-zinc-600">
                            <ImageIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
                            <p className="font-mono text-sm">WAITING FOR IMAGE SOURCE...</p>
                        </div>
                    ) : (
                        <div className="relative max-w-2xl w-full aspect-[4/3] bg-black rounded shadow-2xl overflow-hidden border border-zinc-800">
                            {/* Display Result if available, else Source */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={encryptedImage || previewUrl} alt="Medical Scan" className="w-full h-full object-contain bg-black" />

                            {/* Scanning Effect */}
                            {isProcessing && (
                                <div className="absolute inset-0 bg-cyan-500/10 w-full h-2 animate-scan shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
                            )}

                            {/* Success Overlay */}
                            {encryptedImage && !isProcessing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl text-center border border-green-500/50">
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Encryption Successful</h3>
                                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Data secure. Image looks identical.</p>
                                        <button onClick={downloadImage} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                            Download Protected PNG
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
