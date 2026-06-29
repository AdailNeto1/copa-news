"use client"

import { useState } from "react"
import useSWR from "swr"
import type { Jogo } from "@/lib/types"
import { fetcher } from "@/lib/types"
import { TeamBadge } from "./team-badge"
import { JogoDetalhes } from "./jogo-detalhes"

export function EstatisticasTab() {
  const { data, error, isLoading } = useSWR<{ jogos: Jogo[] }>("/api/estatisticas", fetcher)
  const [jogoSelecionado, setJogoSelecionado] = useState<Jogo | null>(null)

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-card" />
        ))}
      </div>
    )
  }

  if (error || !data?.jogos) {
    return (
      <p className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
        Não foi possível carregar os jogos. Tente novamente mais tarde.
      </p>
    )
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">
        Selecione um jogo para ver as estatísticas detalhadas.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {data.jogos.map((jogo) => (
          <button
            key={jogo.id}
            onClick={() => setJogoSelecionado(jogo)}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/40"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {jogo.grupo ?? jogo.fase}
              </span>
              <span className="text-[11px] uppercase tracking-wide text-primary">{jogo.status}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-2.5">
                <TeamBadge codigo={jogo.pais_casa} size="sm" />
                <span className="truncate text-sm font-medium">{jogo.time_casa}</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-lg font-bold">
                <span>{jogo.gols_casa}</span>
                <span className="text-muted-foreground">×</span>
                <span>{jogo.gols_fora}</span>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2.5">
                <span className="truncate text-right text-sm font-medium">{jogo.time_fora}</span>
                <TeamBadge codigo={jogo.pais_fora} size="sm" />
              </div>
            </div>

            <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              Ver estatísticas →
            </span>
          </button>
        ))}
      </div>

      {jogoSelecionado && (
        <JogoDetalhes jogo={jogoSelecionado} onClose={() => setJogoSelecionado(null)} />
      )}
    </>
  )
}
