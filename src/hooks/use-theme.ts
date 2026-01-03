'use client'

import { useState, useEffect } from 'react'

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        // Check local storage or system preference
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            setTheme('light')
        }
    }, [])

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
