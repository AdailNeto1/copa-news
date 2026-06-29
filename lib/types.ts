export type Noticia = {
  id: number
  titulo: string
  resumo: string | null
  conteudo: string | null
  fonte: string | null
  autor: string | null
  categoria: string | null
  url_imagem: string | null
  url_original: string | null
  publicado_em: string
}

export type Jogo = {
  id: number
  fixture_id: number | null
  time_casa: string
  time_fora: string
  pais_casa: string | null
  pais_fora: string | null
  gols_casa: number
  gols_fora: number
  fase: string | null
  grupo: string | null
  estadio: string | null
  cidade: string | null
  status: string | null
  data_jogo: string
  posse_casa: number
  posse_fora: number
  chutes_casa: number
  chutes_fora: number
  chutes_gol_casa: number
  chutes_gol_fora: number
  faltas_casa: number
  faltas_fora: number
  escanteios_casa: number
  escanteios_fora: number
  cartoes_amarelos_casa: number
  cartoes_amarelos_fora: number
  passes_casa: number
  passes_fora: number
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())
