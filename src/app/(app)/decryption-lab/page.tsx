'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Moon, FileKey, Unlock, CheckCircle, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import FileUploader from '@/components/FileUploader'
import { GlobalSteganography } from '@/lib/steganography'
import { logAudit } from '@/app/actions/audit'

export default function DecryptionLabPage() {
    const [file, setFile] = useState<File | null>(null)
    const [logs, setLogs] = useState<string[]>(['> System initialized.', '> Waiting for input stream...'])
    const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    // New State for Encryption Handling
    const [encryptedPayload, setEncryptedPayload] = useState<string | null>(null)
    const [password, setPassword] = useState('')
    const [requiresPassword, setRequiresPassword] = useState(false)

    const handleFileSelect = async (selectedFile: File) => {
        setFile(selectedFile)
        setDecryptedMessage(null)
        setEncryptedPayload(null)
        setRequiresPassword(false)
        setPassword('')

        setLogs(['> System initialized.', `> File detected: ${selectedFile.name}`, '> Analyzing LSB header...'])
        setIsProcessing(true)

        try {
            // 1. Load Image
            const imgBitmap = await createImageBitmap(selectedFile)
            const canvas = document.createElement('canvas')
            canvas.width = imgBitmap.width
            canvas.height = imgBitmap.height
            const ctx = canvas.getContext('2d')
            if (!ctx) throw new Error('Context failure')

            ctx.drawImage(imgBitmap, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

            setLogs(prev => [...prev, '> Extracting bitstream...'])

            // 2. Decode (Raw LSB extraction)
            const rawPayload = GlobalSteganography.decode(imageData)

            // 3. Check for Encryption
            if (rawPayload.startsWith("ENC:")) {
                setLogs(prev => [...prev, '> ENCRYPTED PAYLOAD DETECTED.', '> Authorization required.'])
                setEncryptedPayload(rawPayload)
                setRequiresPassword(true)
                setIsProcessing(false)
                return
            }

            // Plain text success
            setLogs(prev => [...prev, '> Payload identified.', '> Decrypting content...'])
            await new Promise(r => setTimeout(r, 500))

            setDecryptedMessage(rawPayload)
            setLogs(prev => [...prev, '> SUCCESS: Data extracted.'])

            await logAudit('DECRYPT_OP', selectedFile.name + " (Plain)")
            setIsProcessing(false)

        } catch (e) {
            console.error(e)
            setLogs(prev => [...prev, '> ERROR: Failed to decode image.'])
            setIsProcessing(false)
        }
    }

    const handleDecryptValues = async () => {
        if (!encryptedPayload || !password) return
        setIsProcessing(true)
        setLogs(prev => [...prev, '> Attempting decryption with provided key...'])

        try {
            const message = await GlobalSteganography.decrypt(encryptedPayload, password)
            setDecryptedMessage(message)
            setLogs(prev => [
                ...prev,
                '> Verifying integrity...',
                '> Extracting Dynamic Salt...',
                '> Deriving AES-256 Key (PBKDF2)...',
                '> ACCESS GRANTED.',
                '> Payload decrypted successfully.'
            ])
            setRequiresPassword(false)

            await logAudit('DECRYPT_OP', file?.name + " (AES-256)")
        } catch (error) {
            console.error(error)
            setLogs(prev => [...prev, '> ACCESS DENIED: Invalid password or corrupted data.'])
            alert("Invalid Password")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Nav */}
            <nav className="border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 h-16 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <span className="font-bold tracking-tight">Decryption Lab</span>
                </div>
            </nav>

            {/* Main Workspace */}
            <main className="flex-1 flex overflow-hidden">
                {/* Input Panel (Center) */}
                <div className="flex-1 p-12 flex flex-col items-center justify-center overflow-y-auto">

                    <div className="max-w-2xl w-full space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">Extract Hidden Data</h1>
                            <p className="text-slate-500 dark:text-zinc-400">Upload a Stego-Image to retrieve the diagnosis.</p>
                        </div>

                        {/* Results Area (Success) */}
                        {decryptedMessage ? (
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm w-full animate-in fade-in zoom-in-95">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <Unlock className="w-5 h-5 text-green-600 dark:text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Decryption Successful</h3>
                                        <p className="text-sm text-slate-500">Payload extracted from {file?.name}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap break-all">
                                    {decryptedMessage}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(decryptedMessage || '')
                                            alert('Copied to clipboard!')
                                        }}
                                        className="mt-6 flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Copy to Clipboard
                                    </button>
                                    <button
                                        onClick={() => {
                                            setDecryptedMessage(null)
                                            setFile(null)
                                            setLogs(['> System ready.'])
                                        }}
                                        className="mt-6 flex-1 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg font-medium transition-colors"
                                    >
                                        Process Another
                                    </button>
                                </div>
                            </div>
                        ) : requiresPassword ? (
                            /* Password Prompt */
                            <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/50 rounded-2xl p-8 shadow-sm w-full animate-in fade-in zoom-in-95">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Encrypted Data Detected</h3>
                                        <p className="text-sm text-slate-500">This file is protected with AES-256 encryption.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter decryption password"
                                        className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                                        autoFocus
                                        onKeyDown={(e) => e.key === 'Enter' && handleDecryptValues()}
                                    />
                                    <button
                                        onClick={handleDecryptValues}
                                        disabled={!password || isProcessing}
                                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                                    >
                                        {isProcessing ? 'DECRYPTING...' : 'UNLOCK PAYLOAD'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Dropzone */
                            <FileUploader
                                onFileSelect={handleFileSelect}
                                label="Drop Encrypted PNG"
                                subLabel="or click to browse"
                                icon={FileKey}
                                className={cn(
                                    "p-12 border-dashed rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:border-purple-500 dark:hover:border-indigo-500 transition-all",
                                    isProcessing ? "opacity-50 pointer-events-none" : ""
                                )}
                                activeClassName="border-purple-500 bg-purple-50 dark:bg-indigo-900/20"
                            />
                        )}

                        {/* Terminal Output (Simulated) */}
                        <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm h-48 overflow-y-auto border border-slate-800 shadow-inner">
                            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-slate-500 ml-2">decoder_log.txt</span>
                            </div>
                            <div className="space-y-1 text-slate-300">
                                {logs.map((log, i) => (
                                    <p key={i} className={cn(log.includes('ERROR') || log.includes('DENIED') ? 'text-red-400' : log.includes('SUCCESS') || log.includes('GRANTED') ? 'text-green-400' : '')}>
                                        {log}
                                    </p>
                                ))}
                                {isProcessing && <p className="animate-pulse">_ processing stream...</p>}
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    )
}
