// Grafico de barra comparativo entre os dois times para uma estatistica.
// A barra preenche proporcionalmente os dois lados (casa x fora).

export function StatComparacao({
  rotulo,
  casa,
  fora,
  sufixo = "",
}: {
  rotulo: string
  casa: number
  fora: number
  sufixo?: string
}) {
  const total = casa + fora
  const pctCasa = total === 0 ? 50 : Math.round((casa / total) * 100)
  const pctFora = 100 - pctCasa

  const casaMaior = casa >= fora

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span
          className={`font-mono font-bold ${casaMaior ? "text-primary" : "text-foreground"}`}
        >
          {casa}
          {sufixo}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {rotulo}
        </span>
        <span
          className={`font-mono font-bold ${!casaMaior ? "text-accent" : "text-foreground"}`}
        >
          {fora}
          {sufixo}
        </span>
      </div>

      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-l-full bg-primary transition-all duration-500"
          style={{ width: `${pctCasa}%` }}
        />
        <div
          className="h-full rounded-r-full bg-accent transition-all duration-500"
          style={{ width: `${pctFora}%` }}
        />
      </div>
    </div>
  )
}
