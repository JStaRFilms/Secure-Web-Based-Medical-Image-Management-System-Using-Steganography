'use client'

import { useEffect, useState } from 'react'

function getInitialTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light'

    return localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light'
}

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
            setTheme('light')
        }
    }

    return { theme, toggleTheme }
}
