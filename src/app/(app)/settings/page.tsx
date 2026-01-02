'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { Monitor, Moon, Sun, Shield, HardDrive, Bell, Eye, Download, Trash2, Smartphone } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { getAllAudits } from '@/app/actions/audit'

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const [reducedMotion, setReducedMotion] = useState(false)
    const [highContrast, setHighContrast] = useState(false)
    const [isExporting, setIsExporting] = useState(false)

    // Mock specific settings for now, or persist them next
    const [autoLogout, setAutoLogout] = useState('15')

    // Load preferences from localStorage on mount
    useEffect(() => {
        const storedMotion = localStorage.getItem('settings_reducedMotion')
        const storedContrast = localStorage.getItem('settings_highContrast')
        const storedLogout = localStorage.getItem('settings_autoLogout')

        if (storedMotion) setReducedMotion(JSON.parse(storedMotion))
        if (storedContrast) setHighContrast(JSON.parse(storedContrast))
        if (storedLogout) setAutoLogout(storedLogout)
    }, [])

    // Save preferences when changed
    const handleMotionChange = (checked: boolean) => {
        setReducedMotion(checked)
        localStorage.setItem('settings_reducedMotion', JSON.stringify(checked))
        document.documentElement.style.scrollBehavior = checked ? 'auto' : 'smooth'
    }

    const handleContrastChange = (checked: boolean) => {
        setHighContrast(checked)
        localStorage.setItem('settings_highContrast', JSON.stringify(checked))
        // Actual high contrast implementation would act here (e.g. adding a class to body)
        if (checked) {
            document.documentElement.classList.add('high-contrast')
        } else {
            document.documentElement.classList.remove('high-contrast')
        }
    }

    const handleClearData = () => {
        if (confirm("Are you sure? This will reset all local preferences and potential cached keys.")) {
            localStorage.clear()
            sessionStorage.clear()
            window.location.reload()
        }
    }

    const handleExportLogs = async () => {
        setIsExporting(true)
        try {
            const logs = await getAllAudits()
            if (!logs || logs.length === 0) {
                alert("No logs to export.")
                setIsExporting(false)
                return
            }

            // Convert to CSV
            const headers = ["ID", "Operation", "Details", "Timestamp"]
            const rows = logs.map(log => [
                log.id,
                log.operation,
                `"${log.details || ''}"`, // Quote details in case of commas
                new Date(log.timestamp).toISOString()
            ])

            const csvContent = [
                headers.join(','),
                ...rows.map(r => r.join(','))
            ].join('\n')

            // Trigger Download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.setAttribute('href', url)
            link.setAttribute('download', `system_audit_logs_${new Date().toISOString().split('T')[0]}.csv`)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.error("Export failed", error)
            alert("Failed to export logs.")
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Header />

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto space-y-8">

                    <div>
                        <h1 className="text-2xl font-bold">Settings & Preferences</h1>
                        <p className="text-slate-500 dark:text-zinc-400">Manage your workspace configuration and security policies.</p>
                    </div>

                    {/* Section: Appearance */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-2">
                            <Monitor className="w-4 h-4" /> Appearance
                        </h2>
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-zinc-800 shadow-sm">

                            {/* Theme Selector */}
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-slate-900 dark:text-zinc-100">Interface Theme</h3>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400">Select your preferred color scheme.</p>
                                </div>
                                <div className="flex bg-slate-100 dark:bg-zinc-950 p-1 rounded-lg">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={cn("p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium", theme === 'light' ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600 dark:text-cyan-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200")}
                                    >
                                        <Sun className="w-4 h-4" /> Light
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={cn("p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium", theme === 'dark' ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600 dark:text-cyan-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200")}
                                    >
                                        <Moon className="w-4 h-4" /> Dark
                                    </button>
                                    <button
                                        onClick={() => setTheme('system')}
                                        className={cn("p-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium", theme === 'system' ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600 dark:text-cyan-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-zinc-200")}
                                    >
                                        <Monitor className="w-4 h-4" /> System
                                    </button>
                                </div>
                            </div>

                            {/* Animations / a11y */}
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg h-fit text-purple-600">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-zinc-100">Reduced Motion</h3>
                                        <p className="text-sm text-slate-500 dark:text-zinc-400">Disable complex animations for a simpler experience.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={reducedMotion}
                                        onChange={(e) => handleMotionChange(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Section: Security */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Security
                        </h2>
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-zinc-800 shadow-sm">

                            {/* Encryption Standard */}
                            <div className="p-6 flex items-center justify-between opacity-75">
                                <div>
                                    <h3 className="font-medium text-slate-900 dark:text-zinc-100">Encryption Algorithm</h3>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400">Standard used for the AES-GCM engine.</p>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-mono font-bold">
                                    AES-256-GCM
                                </div>
                            </div>

                            {/* Auto Logout */}
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg h-fit text-blue-600">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-zinc-100">Session Timeout</h3>
                                        <p className="text-sm text-slate-500 dark:text-zinc-400">Automatically lock the lab after inactivity.</p>
                                    </div>
                                </div>
                                <select
                                    value={autoLogout}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        setAutoLogout(val)
                                        localStorage.setItem('settings_autoLogout', val)
                                    }}
                                    className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="5">5 Minutes</option>
                                    <option value="15">15 Minutes</option>
                                    <option value="30">30 Minutes</option>
                                    <option value="0">Never</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section: Data */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-2">
                            <HardDrive className="w-4 h-4" /> Data Management
                        </h2>
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-zinc-800 shadow-sm">

                            {/* Clear Cache */}
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg h-fit text-red-600">
                                        <Trash2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-zinc-100">Clear Browser Cache</h3>
                                        <p className="text-sm text-slate-500 dark:text-zinc-400">Remove temporary keys and recent file references.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClearData}
                                    className="px-4 py-2 border border-slate-200 dark:border-zinc-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 text-slate-600 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Clear Data
                                </button>
                            </div>

                            {/* Download Logs */}
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg h-fit text-slate-600 dark:text-zinc-400">
                                        <Download className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-zinc-100">Export Audit Logs</h3>
                                        <p className="text-sm text-slate-500 dark:text-zinc-400">Download a CSV report of all activity.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleExportLogs}
                                    disabled={isExporting}
                                    className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-zinc-100 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {isExporting ? 'Exporting...' : 'Export CSV'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center pt-8 pb-4">
                        <p className="text-xs text-slate-400 dark:text-zinc-600 font-mono">BigSam Steganography v1.0.0 • Secure Client-Side Engine</p>
                    </div>

                </div>
            </main>
        </div>
    )
}
