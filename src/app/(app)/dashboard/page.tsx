import Link from 'next/link'
import Header from '@/components/Header'
import { Lock, Unlock, Shield, ArrowUp, ArrowRight, FileLock, FileKey } from 'lucide-react'
import { getAuditStats, getRecentAudits } from '@/app/actions/audit'

export default async function DashboardPage() {
    const stats = await getAuditStats()
    const recentAudits = await getRecentAudits()

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <Header />

            <div className="p-8 max-w-6xl mx-auto space-y-8 w-full">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. Sam.</h1>
                    <p className="text-slate-500 dark:text-zinc-400">System is ready for steganographic operations.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">Encrypted Images</span>
                            <Lock className="w-5 h-5 text-blue-600 dark:text-cyan-500" />
                        </div>
                        <p className="text-3xl font-bold font-mono">{stats.totalEncryptions}</p>
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> +{stats.weeklyGrowth} this week
                        </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">Decryption Events</span>
                            <Unlock className="w-5 h-5 text-purple-600 dark:text-indigo-500" />
                        </div>
                        <p className="text-3xl font-bold font-mono">{stats.totalDecryptions}</p>
                        <p className="text-xs text-slate-400 mt-1">Last activity: recently</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">Security Level</span>
                            <Shield className="w-5 h-5 text-green-600 dark:text-emerald-500" />
                        </div>
                        <p className="text-3xl font-bold font-mono text-green-600 dark:text-emerald-500">HIGH</p>
                        <p className="text-xs text-slate-400 mt-1">Audit Log: Active</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/encryption-lab" className="flex items-center p-6 bg-blue-600 text-white dark:bg-cyan-600 rounded-xl hover:bg-blue-700 dark:hover:bg-cyan-700 transition-all shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 group">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <FileLock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">New Encryption</h3>
                            <p className="text-blue-100 dark:text-cyan-100 text-sm">Embed diagnosis into a new image.</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5" />
                    </Link>

                    <Link href="/decryption-lab" className="flex items-center p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all group">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <FileKey className="w-6 h-6 text-slate-700 dark:text-zinc-300" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Decrypt Image</h3>
                            <p className="text-slate-500 dark:text-zinc-400 text-sm">Extract hidden data from an image.</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-slate-400" />
                    </Link>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                        <h3 className="font-semibold text-sm">Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {recentAudits.length === 0 ? (
                            <div className="px-6 py-4 text-sm text-slate-500 dark:text-zinc-500">No activity recorded yet.</div>
                        ) : (
                            recentAudits.map((e) => (
                                <div key={e.id} className="px-6 py-4 flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${e.operation === 'ENCRYPT_OP' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                                        <span className="font-mono text-slate-600 dark:text-zinc-400">{e.operation}</span>
                                        <span className="text-slate-900 dark:text-zinc-200">{e.details}</span>
                                    </div>
                                    <span className="text-slate-400 text-xs">
                                        {new Date(e.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}
