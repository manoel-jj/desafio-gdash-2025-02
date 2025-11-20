import pool from "./db.js";

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Tabela 'users' criada com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao criar tabela:", err.message);
    process.exit(1);
  }
}

init();
