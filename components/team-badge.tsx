// Badge circular com o codigo do pais (ex: BR, AR).
// Evita depender de imagens de bandeira e mantem o visual consistente.

const CORES: Record<string, string> = {
  BR: "#16a34a",
  AR: "#38bdf8",
  FR: "#2563eb",
  ES: "#dc2626",
  GB: "#475569",
  DE: "#0f172a",
  PT: "#15803d",
  NL: "#ea580c",
  US: "#1d4ed8",
  MX: "#047857",
  JP: "#e11d48",
  MA: "#b91c1c",
  UY: "#0ea5e9",
  HR: "#b91c1c",
  SN: "#16a34a",
  RS: "#991b1b",
}

export function TeamBadge({
  codigo,
  size = "md",
}: {
  codigo: string | null
  size?: "sm" | "md" | "lg"
}) {
  const sigla = (codigo ?? "??").toUpperCase()
  const cor = CORES[sigla] ?? "#334155"

  const dimensoes = {
    sm: "h-8 w-8 text-[10px]",
    md: "h-11 w-11 text-xs",
    lg: "h-16 w-16 text-base",
  }[size]

  return (
    <span
      className={`${dimensoes} inline-flex shrink-0 items-center justify-center rounded-full font-mono font-bold text-white ring-2 ring-white/10`}
      style={{ backgroundColor: cor }}
      aria-hidden="true"
    >
      {sigla}
    </span>
  )
}
