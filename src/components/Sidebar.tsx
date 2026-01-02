'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck, LayoutDashboard, Lock, Unlock, History, Settings, Moon, Sun, ArrowRight, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/hooks/use-theme'

export function Sidebar() {
    const { data: session } = authClient.useSession()
    const router = useRouter()
    const pathname = usePathname()
    const { theme, toggleTheme } = useTheme()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                },
            },
        })
    }

    const isActive = (path: string) => pathname === path

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 dark:bg-cyan-600 rounded flex items-center justify-center">
                        <ShieldCheck className="text-white w-4 h-4" />
                    </div>
                    <span className="font-bold tracking-tight text-sm">BigSam<span
                        className="text-slate-400 dark:text-zinc-500">Stego</span></span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <Link href="/dashboard"
                    className={clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive('/dashboard')
                            ? "bg-blue-50 text-blue-700 dark:bg-cyan-900/20 dark:text-cyan-400"
                            : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100"
                    )}>
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link href="/encryption-lab"
                    className={clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive('/encryption-lab')
                            ? "bg-blue-50 text-blue-700 dark:bg-cyan-900/20 dark:text-cyan-400"
                            : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100"
                    )}>
                    <Lock className="w-4 h-4" /> Encryption Lab
                </Link>
                <Link href="/decryption-lab"
                    className={clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive('/decryption-lab')
                            ? "bg-blue-50 text-blue-700 dark:bg-cyan-900/20 dark:text-cyan-400"
                            : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100"
                    )}>
                    <Unlock className="w-4 h-4" /> Decryption Lab
                </Link>
                <Link href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium">
                    <History className="w-4 h-4" /> Audit Logs
                </Link>
                <Link href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium">
                    <Settings className="w-4 h-4" /> Settings
                </Link>
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-slate-600 dark:text-zinc-400 text-xs">
                        {session?.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                        <p className="text-xs font-medium">{session?.user?.name || "Dr. Sam"}</p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-500">{session?.user?.email || "Radiology Dept."}</p>
                    </div>
                </div>
                <button onClick={toggleTheme}
                    className="mt-4 w-full flex items-center justify-center gap-2 p-2 text-xs font-medium border border-slate-200 dark:border-zinc-700 rounded text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                    {theme === 'light' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                    Toggle Theme
                </button>
                <button
                    onClick={handleSignOut}
                    className="mt-2 w-full flex items-center justify-center gap-2 p-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors"
                >
                    <LogOut className="w-3 h-3" /> Sign Out
                </button>
            </div>
        </aside>
    )
}
