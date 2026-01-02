'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck, LayoutDashboard, Lock, Unlock, History, Settings, Moon, Sun } from 'lucide-react'
import { clsx } from 'clsx'
import { ThemeToggle } from '@/components/ThemeToggle'

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/encryption-lab', label: 'Encryption Lab', icon: Lock },
    { href: '/decryption-lab', label: 'Decryption Lab', icon: Unlock },
    { href: '#', label: 'Audit Logs', icon: History },
    { href: '#', label: 'Settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden md:flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 dark:bg-cyan-600 rounded flex items-center justify-center">
                        <ShieldCheck className="text-white w-4 h-4" />
                    </div>
                    <span className="font-bold tracking-tight text-sm">
                        BigSam<span className="text-slate-400 dark:text-zinc-500">Stego</span>
                    </span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-blue-50 text-blue-700 dark:bg-cyan-900/20 dark:text-cyan-400'
                                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100'
                            )}
                        >
                            <Icon className="w-4 h-4" /> {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700"></div>
                    <div>
                        <p className="text-xs font-medium">Dr. Sam</p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-500">Radiology Dept.</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    )
}
