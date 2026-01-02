'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSignIn = async () => {
        setLoading(true)
        await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        }, {
            onRequest: () => {
                setLoading(true)
            },
            onSuccess: () => {
                router.push("/dashboard")
            },
            onError: (ctx) => {
                alert(ctx.error.message)
                setLoading(false)
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-blue-600 dark:bg-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">System Login</h1>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm mt-2">Enter your credentials to access the secure portal.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-zinc-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 outline-none transition-all"
                            placeholder="dr.sam@hospital.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-zinc-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        onClick={handleSignIn}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate"}
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-400">
                    New personnel? <Link href="/sign-up" className="text-blue-600 dark:text-cyan-400 hover:underline">Register access found</Link>
                </div>
            </div>
        </div>
    )
}
