import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Central da Copa 2026</h1>
            <p className="text-xs text-muted-foreground">Notícias e estatísticas em tempo real</p>
          </div>
          <span className="ml-auto hidden items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Ao vivo
          </span>
        </div>
      </header>

      <Dashboard />

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Dados alimentados pelo coletor Python · PostgreSQL · Next.js
      </footer>
    </>
  )
}
