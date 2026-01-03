'use client'

import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
            {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-cyan-400" />
            ) : (
                <Sun className="w-5 h-5 text-orange-500" />
            )}
        </button>
    )
}
