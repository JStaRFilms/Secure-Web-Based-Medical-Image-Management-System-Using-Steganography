import Header from '@/components/Header'
import { getAllAudits } from '@/app/actions/audit'
import { History, ShieldAlert, CheckCircle, Smartphone } from 'lucide-react'

export default async function AuditLogsPage() {
    const events = await getAllAudits()

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Header />

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto space-y-6">

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">System Audit Logs</h1>
                            <p className="text-slate-500 dark:text-zinc-400">Complete history of all cryptographic operations.</p>
                        </div>
                        <div className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm font-mono text-slate-500">
                            Total Records: {events.length}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 uppercase text-xs font-semibold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Operation</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">User ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                {events.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            No audit records found.
                                        </td>
                                    </tr>
                                ) : (
                                    events.map((e) => (
                                        <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span className="font-medium text-green-700 dark:text-green-400">Success</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs">
                                                <span className={`px-2 py-1 rounded ${e.operation === 'ENCRYPT_OP' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                                                    {e.operation}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-900 dark:text-zinc-200 font-medium">
                                                {e.details || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                                {new Date(e.timestamp).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                                                {e.userId || 'System'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </div>
    )
}
