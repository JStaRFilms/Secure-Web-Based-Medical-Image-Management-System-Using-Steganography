'use client'

import React from 'react'

export default function Header({ title = "Command Center" }: { title?: string }) {
    return (
        <header className="h-16 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-emerald-400 bg-green-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-emerald-500 animate-pulse"></div>
                SYSTEM SECURE
            </div>
        </header>
    )
}
