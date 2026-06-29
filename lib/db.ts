import { neon } from "@neondatabase/serverless"

// Conexao com o PostgreSQL (Neon) usando a connection string do ambiente.
// O mesmo banco e alimentado pelo script Python em scripts/coletar_dados_copa.py.
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL nao esta definida. Verifique as variaveis de ambiente do projeto.")
}

export const sql = neon(connectionString)
