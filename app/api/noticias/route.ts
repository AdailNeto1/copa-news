import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// GET /api/noticias
// Le os artigos salvos na tabela noticias_copa e retorna como JSON.
export async function GET() {
  try {
    const noticias = await sql`
      SELECT
        id,
        titulo,
        resumo,
        conteudo,
        fonte,
        autor,
        categoria,
        url_imagem,
        url_original,
        publicado_em
      FROM noticias_copa
      ORDER BY publicado_em DESC
    `

    return NextResponse.json({ noticias })
  } catch (error) {
    console.error("[v0] Erro ao buscar noticias:", error)
    return NextResponse.json(
      { error: "Nao foi possivel carregar as noticias." },
      { status: 500 },
    )
  }
}
