'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck, LayoutDashboard, Lock, Unlock, History, Settings, Moon, Sun, FileText, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { ThemeToggle } from '@/components/ThemeToggle'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export function Sidebar() {
    const { data: session } = authClient.useSession()
    const router = useRouter()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                },
            },
        })
    }

    return (
        <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-screen fixed left-0 top-0 z-30">
            {/* Branding */}
            <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200 dark:border-zinc-800">
                <div className="w-8 h-8 bg-blue-600 dark:bg-cyan-600 rounded flex items-center justify-center">
                    <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="font-bold tracking-tight text-lg">
                    BigSam<span className="text-slate-400 dark:text-zinc-500">Stego</span>
                </span>
            </div>

            {/* User Profile */}
            <div className="p-4 border-b border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-blue-600 dark:text-zinc-400">
                        {session?.user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session?.user?.name || "User"}</p>
                        <p className="text-xs text-slate-500 dark:text-zinc-500 truncate">{session?.user?.email || "No Session"}</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>
                <Link href="/encryption-lab" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors">
                    <Lock className="w-4 h-4" />
                    Encryption Lab
                </Link>
                <Link href="/decryption-lab" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors">
                    <Unlock className="w-4 h-4" />
                    Decryption Lab
                </Link>
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-zinc-800">
                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</p>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors">
                        <FileText className="w-4 h-4" />
                        Audit Logs
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-500">Dark Mode</span>
                    <ThemeToggle />
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
