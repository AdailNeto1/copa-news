"""
================================================================================
 Coletor de Dados - Copa do Mundo 2026
================================================================================
Script de back-end / automacao em Python.

O que ele faz:
  1. Simula o consumo de uma API de futebol (no estilo da API-Football),
     gerando dados "em tempo real" de noticias, placares e estatisticas
     (posse de bola, chutes, faltas, etc.) da Copa do Mundo de 2026.
  2. Conecta-se a um banco PostgreSQL usando a variavel de ambiente DATABASE_URL.
  3. Salva os dados de forma estruturada em duas tabelas:
       - noticias_copa
       - estatisticas_jogos

Como usar:
  1. Instale as dependencias:
       pip install -r scripts/requirements.txt
  2. Defina a connection string do Postgres (Neon) no ambiente:
       export DATABASE_URL="postgresql://usuario:senha@host/db?sslmode=require"
  3. Execute:
       python scripts/coletar_dados_copa.py

Em producao, este script poderia ser agendado (cron / GitHub Actions / Vercel Cron)
para rodar periodicamente e manter o banco atualizado.

Observacao: para usar a API-Football de verdade, basta trocar as funcoes
`simular_*` por chamadas reais com `requests.get(URL, headers={...})`.
================================================================================
"""

import os
import sys
import random
from datetime import datetime, timedelta, timezone

try:
    import psycopg2
    from psycopg2.extras import execute_values
except ImportError:
    print("[ERRO] psycopg2 nao encontrado. Rode: pip install -r scripts/requirements.txt")
    sys.exit(1)


# ------------------------------------------------------------------------------
# 1. CONFIGURACAO
# ------------------------------------------------------------------------------

# Em um cenario real voce usaria estas variaveis para chamar a API-Football:
#   API_BASE_URL = "https://v3.football.api-sports.io"
#   API_KEY = os.environ.get("API_FOOTBALL_KEY")
#   HEADERS = {"x-apisports-key": API_KEY}
# E o ID da Copa do Mundo 2026 (league) seria passado nas requisicoes.

DATABASE_URL = os.environ.get("DATABASE_URL")


# ------------------------------------------------------------------------------
# 2. SIMULACAO DO CONSUMO DA API (substituivel por requests reais)
# ------------------------------------------------------------------------------

SELECOES = [
    ("Brasil", "BR"), ("Argentina", "AR"), ("Franca", "FR"), ("Espanha", "ES"),
    ("Inglaterra", "GB"), ("Alemanha", "DE"), ("Portugal", "PT"), ("Paises Baixos", "NL"),
    ("Estados Unidos", "US"), ("Mexico", "MX"), ("Japao", "JP"), ("Marrocos", "MA"),
    ("Uruguai", "UY"), ("Croacia", "HR"), ("Senegal", "SN"), ("Servia", "RS"),
]

ESTADIOS = [
    ("MetLife Stadium", "Nova York"),
    ("SoFi Stadium", "Los Angeles"),
    ("Estadio Azteca", "Cidade do Mexico"),
    ("BMO Field", "Toronto"),
    ("AT&T Stadium", "Dallas"),
    ("Mercedes-Benz Stadium", "Atlanta"),
    ("Hard Rock Stadium", "Miami"),
    ("Lumen Field", "Seattle"),
]

GRUPOS = ["Grupo A", "Grupo B", "Grupo C", "Grupo D",
          "Grupo E", "Grupo F", "Grupo G", "Grupo H"]

FONTES = ["Globo Esporte", "ESPN", "Lance!", "UOL Esporte", "CNN Esportes", "Folha Esporte"]
CATEGORIAS = ["Selecao Brasileira", "Analise", "Organizacao", "Tecnologia", "Selecoes", "Bastidores"]


def simular_busca_noticias(quantidade=6):
    """Simula a resposta de um endpoint de noticias da Copa 2026."""
    titulos = [
        "Brasil estreia com vitoria convincente na Copa 2026",
        "Estadios dos EUA, Mexico e Canada recebem ajustes finais",
        "Argentina e Franca protagonizam reencontro de gigantes",
        "Tecnologia de impedimento semiautomatico e aprimorada",
        "Selecoes africanas chegam com expectativa de surpreender",
        "Ingressos para a final ja estao esgotados",
        "Copa de 2026 sera a primeira com 48 selecoes",
        "Craques se preparam para o maior Mundial da historia",
    ]
    noticias = []
    for i in range(quantidade):
        publicado = datetime.now(timezone.utc) - timedelta(hours=random.randint(1, 96))
        noticias.append({
            "titulo": random.choice(titulos),
            "resumo": "Resumo gerado automaticamente a partir do feed da API de futebol.",
            "conteudo": ("Conteudo completo da materia sobre a Copa do Mundo de 2026. "
                         "Este texto seria retornado pelo endpoint de noticias da API-Football "
                         "ou de um agregador de noticias esportivas."),
            "fonte": random.choice(FONTES),
            "autor": "Redacao Esportiva",
            "categoria": random.choice(CATEGORIAS),
            "url_imagem": "/world-cup-news.jpg",
            "url_original": f"https://exemplo.com/noticia-{i}",
            "publicado_em": publicado,
        })
    return noticias


def simular_busca_jogos(quantidade=8):
    """Simula a resposta de um endpoint de jogos + estatisticas da Copa 2026."""
    jogos = []
    selecoes_disponiveis = SELECOES.copy()
    random.shuffle(selecoes_disponiveis)

    for i in range(quantidade):
        casa = selecoes_disponiveis[(i * 2) % len(selecoes_disponiveis)]
        fora = selecoes_disponiveis[(i * 2 + 1) % len(selecoes_disponiveis)]
        if casa == fora:
            fora = selecoes_disponiveis[(i * 2 + 2) % len(selecoes_disponiveis)]

        estadio, cidade = random.choice(ESTADIOS)
        posse_casa = random.randint(40, 68)
        gols_casa = random.randint(0, 4)
        gols_fora = random.randint(0, 3)

        jogos.append({
            "fixture_id": 2000 + i,
            "time_casa": casa[0],
            "time_fora": fora[0],
            "pais_casa": casa[1],
            "pais_fora": fora[1],
            "gols_casa": gols_casa,
            "gols_fora": gols_fora,
            "fase": "Fase de Grupos",
            "grupo": GRUPOS[i % len(GRUPOS)],
            "estadio": estadio,
            "cidade": cidade,
            "status": "Encerrado",
            "data_jogo": datetime.now(timezone.utc) - timedelta(days=random.randint(0, 7)),
            "posse_casa": posse_casa,
            "posse_fora": 100 - posse_casa,
            "chutes_casa": random.randint(8, 22),
            "chutes_fora": random.randint(5, 18),
            "chutes_gol_casa": random.randint(2, 10),
            "chutes_gol_fora": random.randint(1, 8),
            "faltas_casa": random.randint(6, 16),
            "faltas_fora": random.randint(6, 16),
            "escanteios_casa": random.randint(2, 11),
            "escanteios_fora": random.randint(1, 9),
            "cartoes_amarelos_casa": random.randint(0, 4),
            "cartoes_amarelos_fora": random.randint(0, 4),
            "passes_casa": random.randint(350, 720),
            "passes_fora": random.randint(280, 650),
        })
    return jogos


# ------------------------------------------------------------------------------
# 3. PERSISTENCIA NO POSTGRESQL
# ------------------------------------------------------------------------------

DDL = """
CREATE TABLE IF NOT EXISTS noticias_copa (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    resumo TEXT,
    conteudo TEXT,
    fonte TEXT,
    autor TEXT,
    categoria TEXT,
    url_imagem TEXT,
    url_original TEXT,
    publicado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS estatisticas_jogos (
    id SERIAL PRIMARY KEY,
    fixture_id INTEGER UNIQUE,
    time_casa TEXT NOT NULL,
    time_fora TEXT NOT NULL,
    pais_casa TEXT,
    pais_fora TEXT,
    gols_casa INTEGER DEFAULT 0,
    gols_fora INTEGER DEFAULT 0,
    fase TEXT,
    grupo TEXT,
    estadio TEXT,
    cidade TEXT,
    status TEXT DEFAULT 'Encerrado',
    data_jogo TIMESTAMPTZ NOT NULL DEFAULT now(),
    posse_casa INTEGER DEFAULT 0,
    posse_fora INTEGER DEFAULT 0,
    chutes_casa INTEGER DEFAULT 0,
    chutes_fora INTEGER DEFAULT 0,
    chutes_gol_casa INTEGER DEFAULT 0,
    chutes_gol_fora INTEGER DEFAULT 0,
    faltas_casa INTEGER DEFAULT 0,
    faltas_fora INTEGER DEFAULT 0,
    escanteios_casa INTEGER DEFAULT 0,
    escanteios_fora INTEGER DEFAULT 0,
    cartoes_amarelos_casa INTEGER DEFAULT 0,
    cartoes_amarelos_fora INTEGER DEFAULT 0,
    passes_casa INTEGER DEFAULT 0,
    passes_fora INTEGER DEFAULT 0,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);
"""


def conectar():
    if not DATABASE_URL:
        print("[ERRO] A variavel de ambiente DATABASE_URL nao esta definida.")
        print("       Exemplo: export DATABASE_URL='postgresql://user:pass@host/db?sslmode=require'")
        sys.exit(1)
    return psycopg2.connect(DATABASE_URL)


def criar_tabelas(conn):
    with conn.cursor() as cur:
        cur.execute(DDL)
    conn.commit()
    print("[OK] Tabelas verificadas/criadas.")


def salvar_noticias(conn, noticias):
    sql = """
        INSERT INTO noticias_copa
            (titulo, resumo, conteudo, fonte, autor, categoria, url_imagem, url_original, publicado_em)
        VALUES %s
    """
    valores = [
        (n["titulo"], n["resumo"], n["conteudo"], n["fonte"], n["autor"],
         n["categoria"], n["url_imagem"], n["url_original"], n["publicado_em"])
        for n in noticias
    ]
    with conn.cursor() as cur:
        execute_values(cur, sql, valores)
    conn.commit()
    print(f"[OK] {len(noticias)} noticias salvas em noticias_copa.")


def salvar_estatisticas(conn, jogos):
    sql = """
        INSERT INTO estatisticas_jogos
            (fixture_id, time_casa, time_fora, pais_casa, pais_fora, gols_casa, gols_fora,
             fase, grupo, estadio, cidade, status, data_jogo,
             posse_casa, posse_fora, chutes_casa, chutes_fora, chutes_gol_casa, chutes_gol_fora,
             faltas_casa, faltas_fora, escanteios_casa, escanteios_fora,
             cartoes_amarelos_casa, cartoes_amarelos_fora, passes_casa, passes_fora)
        VALUES %s
        ON CONFLICT (fixture_id) DO UPDATE SET
            gols_casa = EXCLUDED.gols_casa,
            gols_fora = EXCLUDED.gols_fora,
            posse_casa = EXCLUDED.posse_casa,
            posse_fora = EXCLUDED.posse_fora,
            chutes_casa = EXCLUDED.chutes_casa,
            chutes_fora = EXCLUDED.chutes_fora,
            status = EXCLUDED.status
    """
    valores = [
        (j["fixture_id"], j["time_casa"], j["time_fora"], j["pais_casa"], j["pais_fora"],
         j["gols_casa"], j["gols_fora"], j["fase"], j["grupo"], j["estadio"], j["cidade"],
         j["status"], j["data_jogo"], j["posse_casa"], j["posse_fora"], j["chutes_casa"],
         j["chutes_fora"], j["chutes_gol_casa"], j["chutes_gol_fora"], j["faltas_casa"],
         j["faltas_fora"], j["escanteios_casa"], j["escanteios_fora"],
         j["cartoes_amarelos_casa"], j["cartoes_amarelos_fora"], j["passes_casa"], j["passes_fora"])
        for j in jogos
    ]
    with conn.cursor() as cur:
        execute_values(cur, sql, valores)
    conn.commit()
    print(f"[OK] {len(jogos)} jogos salvos em estatisticas_jogos.")


# ------------------------------------------------------------------------------
# 4. EXECUCAO PRINCIPAL
# ------------------------------------------------------------------------------

def main():
    print("=" * 60)
    print(" Coletor de Dados - Copa do Mundo 2026")
    print("=" * 60)

    print("\n[1/4] Conectando ao PostgreSQL...")
    conn = conectar()

    try:
        print("[2/4] Garantindo estrutura das tabelas...")
        criar_tabelas(conn)

        print("[3/4] Consumindo a API de futebol (simulada)...")
        noticias = simular_busca_noticias()
        jogos = simular_busca_jogos()

        print("[4/4] Salvando dados no banco...")
        salvar_noticias(conn, noticias)
        salvar_estatisticas(conn, jogos)

        print("\n[SUCESSO] Coleta finalizada com sucesso!")
    except Exception as e:
        conn.rollback()
        print(f"\n[ERRO] Falha durante a coleta: {e}")
        sys.exit(1)
    finally:
        conn.close()


if __name__ == "__main__":
    main()
