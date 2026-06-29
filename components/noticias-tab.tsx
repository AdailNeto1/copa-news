"use client"

import useSWR from "swr"
import Image from "next/image"
import type { Noticia } from "@/lib/types"
import { fetcher } from "@/lib/types"

function formatarData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function NoticiasTab() {
  const { data, error, isLoading } = useSWR<{ noticias: Noticia[] }>("/api/noticias", fetcher)

  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl border border-border bg-card" />
        ))}
      </div>
    )
  }

  if (error || !data?.noticias) {
    return (
      <p className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
        Não foi possível carregar as notícias. Tente novamente mais tarde.
      </p>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.noticias.map((noticia) => (
        <article
          key={noticia.id}
          className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50"
        >
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={noticia.url_imagem || "/placeholder.svg?height=240&width=400&query=copa%202026"}
              alt={noticia.titulo}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {noticia.categoria && (
              <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                {noticia.categoria}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4">
            <h3 className="text-base font-semibold leading-snug text-balance">{noticia.titulo}</h3>
            {noticia.resumo && (
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {noticia.resumo}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/80">{noticia.fonte}</span>
              <time dateTime={noticia.publicado_em}>{formatarData(noticia.publicado_em)}</time>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
