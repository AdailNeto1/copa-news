"use client"

import { useEffect } from "react"
import type { Jogo } from "@/lib/types"
import { TeamBadge } from "./team-badge"
import { StatComparacao } from "./stat-comparacao"

export function JogoDetalhes({
  jogo,
  onClose,
}: {
  jogo: Jogo
  onClose: () => void
}) {
  // Fecha com a tecla ESC e bloqueia o scroll do body enquanto aberto.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Estatísticas de ${jogo.time_casa} contra ${jogo.time_fora}`}
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecalho com placar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {jogo.fase} {jogo.grupo ? `· ${jogo.grupo}` : ""}
          </span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Fechar detalhes"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-6">
          {/* Placar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <TeamBadge codigo={jogo.pais_casa} size="lg" />
              <span className="text-sm font-semibold leading-tight text-balance">{jogo.time_casa}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 font-mono text-4xl font-bold">
                <span>{jogo.gols_casa}</span>
                <span className="text-muted-foreground">×</span>
                <span>{jogo.gols_fora}</span>
              </div>
              <span className="mt-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-primary">
                {jogo.status}
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <TeamBadge codigo={jogo.pais_fora} size="lg" />
              <span className="text-sm font-semibold leading-tight text-balance">{jogo.time_fora}</span>
            </div>
          </div>

          {/* Local */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {jogo.estadio} · {jogo.cidade}
          </p>

          {/* Legenda */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              {jogo.time_casa}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              {jogo.time_fora}
            </span>
          </div>

          {/* Graficos de barra */}
          <div className="mt-6 flex flex-col gap-5">
            <StatComparacao rotulo="Posse de bola" casa={jogo.posse_casa} fora={jogo.posse_fora} sufixo="%" />
            <StatComparacao rotulo="Finalizações" casa={jogo.chutes_casa} fora={jogo.chutes_fora} />
            <StatComparacao rotulo="Chutes no gol" casa={jogo.chutes_gol_casa} fora={jogo.chutes_gol_fora} />
            <StatComparacao rotulo="Faltas" casa={jogo.faltas_casa} fora={jogo.faltas_fora} />
            <StatComparacao rotulo="Escanteios" casa={jogo.escanteios_casa} fora={jogo.escanteios_fora} />
            <StatComparacao rotulo="Cartões amarelos" casa={jogo.cartoes_amarelos_casa} fora={jogo.cartoes_amarelos_fora} />
            <StatComparacao rotulo="Passes certos" casa={jogo.passes_casa} fora={jogo.passes_fora} />
          </div>
        </div>
      </div>
    </div>
  )
}
