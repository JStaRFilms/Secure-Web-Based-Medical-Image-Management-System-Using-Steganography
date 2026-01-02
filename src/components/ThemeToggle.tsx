'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Check initial preference
        if (document.documentElement.classList.contains('dark') ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true)
            document.documentElement.classList.add('dark')
        } else {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
            setIsDark(false)
        } else {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
            setIsDark(true)
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <Moon className="w-5 h-5 text-cyan-400" />
            ) : (
                <Sun className="w-5 h-5 text-orange-500" />
            )}
        </button>
    )
}
