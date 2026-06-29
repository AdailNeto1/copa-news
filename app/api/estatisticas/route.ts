import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET /api/estatisticas
// Le os jogos e suas estatisticas da tabela estatisticas_jogos e retorna como JSON.
export async function GET() {
  try {
    const jogos = await sql`
      SELECT
        id,
        fixture_id,
        time_casa,
        time_fora,
        pais_casa,
        pais_fora,
        gols_casa,
        gols_fora,
        fase,
        grupo,
        estadio,
        cidade,
        status,
        data_jogo,
        posse_casa,
        posse_fora,
        chutes_casa,
        chutes_fora,
        chutes_gol_casa,
        chutes_gol_fora,
        faltas_casa,
        faltas_fora,
        escanteios_casa,
        escanteios_fora,
        cartoes_amarelos_casa,
        cartoes_amarelos_fora,
        passes_casa,
        passes_fora
      FROM estatisticas_jogos
      ORDER BY data_jogo DESC
    `

    return NextResponse.json({ jogos })
  } catch (error) {
    console.error("[v0] Erro ao buscar estatisticas:", error)
    return NextResponse.json(
      { error: "Nao foi possivel carregar as estatisticas dos jogos." },
      { status: 500 },
    )
  }
}
