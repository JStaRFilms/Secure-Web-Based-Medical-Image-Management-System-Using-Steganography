'use client'

import { useState, useRef } from 'react'
import { FileKey, ArrowLeft, Terminal } from 'lucide-react'
import Link from 'next/link'
import { decodeLSB } from '@/features/steganography/utils/lsb'
import { logEvent } from '@/actions/audit'

export default function DecryptionLab() {
    const [logs, setLogs] = useState<string[]>(['> System initialized.', '> Waiting for input stream...'])
    const [decodedText, setDecodedText] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `> ${msg}`])
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setLogs(['> System initialized.', '> Input stream detected: ' + file.name])
            setDecodedText(null)

            try {
                addLog('Analyzing file structure...')
                await new Promise(r => setTimeout(r, 800))

                addLog('Reading Least Significant Bits (LSB)...')
                await new Promise(r => setTimeout(r, 800))

                addLog('Reassembling binary payload...')
                const text = await decodeLSB(file)

                addLog('Decryption successful.')
                addLog('Payload size: ' + text.length + ' chars')
                setDecodedText(text)
                await logEvent('DECRYPT', file.name)
            } catch (error) {
                addLog('ERROR: ' + (error as Error).message)
            }
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 h-16 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <span className="font-bold tracking-tight">Decryption Lab</span>
                </div>
            </nav>

            <main className="flex-1 flex overflow-hidden">
                <div className="flex-1 p-12 flex flex-col items-center justify-center overflow-y-auto">
                    <div className="max-w-2xl w-full space-y-8">

                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">Extract Hidden Data</h1>
                            <p className="text-slate-500 dark:text-zinc-400">Upload a Stego-Image to retrieve the diagnosis.</p>
                        </div>

                        {/* Dropzone */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-300 dark:border-zinc-700 rounded-2xl p-12 text-center hover:border-purple-500 dark:hover:border-indigo-500 transition-all cursor-pointer bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden group"
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/png"
                            />
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-purple-500/5 dark:bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                            <div className="w-16 h-16 bg-purple-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <FileKey className="w-8 h-8 text-purple-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-medium">Drop Encrypted PNG</h3>
                            <p className="text-sm text-slate-500 mt-1">or click to browse</p>
                        </div>

                        {/* Terminal Output */}
                        <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm h-64 overflow-y-auto border border-slate-800 shadow-inner flex flex-col">
                            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4 shrink-0">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-slate-500 ml-2">decoder_log.txt</span>
                            </div>
                            <div className="space-y-1 text-slate-300 flex-1 overflow-y-auto">
                                {logs.map((log, i) => (
                                    <p key={i}>{log}</p>
                                ))}
                                {!decodedText && <p className="animate-pulse">_</p>}
                            </div>
                        </div>

                        {/* Result Display */}
                        {decodedText && (
                            <div className="bg-white dark:bg-zinc-900 border border-green-200 dark:border-emerald-900 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-sm font-bold text-green-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">Decoded Payload</h3>
                                <p className="text-lg font-mono text-slate-900 dark:text-zinc-100 whitespace-pre-wrap break-words">{decodedText}</p>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    )
}
