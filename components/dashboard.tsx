"use client"

import { useState } from "react"
import { NoticiasTab } from "./noticias-tab"
import { EstatisticasTab } from "./estatisticas-tab"

type Aba = "noticias" | "estatisticas"

export function Dashboard() {
  const [aba, setAba] = useState<Aba>("noticias")

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
      {/* Navegacao por abas */}
      <nav
        className="sticky top-0 z-20 -mx-4 mb-6 flex gap-1 border-b border-border bg-background/90 px-4 backdrop-blur sm:-mx-6 sm:px-6"
        aria-label="Seções do dashboard"
      >
        <TabButton ativo={aba === "noticias"} onClick={() => setAba("noticias")}>
          Notícias
        </TabButton>
        <TabButton ativo={aba === "estatisticas"} onClick={() => setAba("estatisticas")}>
          Estatísticas
        </TabButton>
      </nav>

      {aba === "noticias" ? <NoticiasTab /> : <EstatisticasTab />}
    </main>
  )
}

function TabButton({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3.5 text-sm font-medium transition-colors ${
        ativo ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
      aria-current={ativo ? "page" : undefined}
    >
      {children}
      {ativo && (
        <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary" />
      )}
    </button>
  )
}
