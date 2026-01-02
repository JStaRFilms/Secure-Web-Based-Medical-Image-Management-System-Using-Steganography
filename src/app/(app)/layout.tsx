import Sidebar from '@/components/Sidebar'
// We don't import Header here because Header title might change per page.
// Or we can make it a specific layout.
// For now, let's keep the layout simple: Sidebar + Content Area.
// The pages will include their own Headers (or we can lift state).
// Looking at mockup, Header is consistent but Title changes ("Command Center").
// Let's put Header in the layout for now but maybe default title? 
// No, the mockup shows content scrolling under the header.
// Let's just put sidebar in layout.

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* The page itself will handle the scrolling and header if needed, or we wrapping it here. */}
                {/* dashboard.html has <main class="flex-1 overflow-y-auto"> that contains <header> then content. */}
                {/* So the Page component should likely render the Header + Content to control the scrolling container? */}
                {/* OR, we make the layout provide the scroll container. */}

                {/* Let's follow the mockup structure: 
             The sidebar is fixed height (h-screen).
             The main part is flex-1. 
             Inside main, we have overflow-y-auto. 
         */}
                {children}
            </main>
        </div>
    )
}
