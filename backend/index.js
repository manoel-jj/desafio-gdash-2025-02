import express from "express";
import pool from "./db.js"

const app = express();
const PORT = 3000;

app.use(express.json()); // necessário para receber JSON

// Listar todos os usuários
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT id, name, email, created_at FROM users");
  res.json(result.rows);
});

// Criar usuário
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
    [name, email, password]
  );
  res.status(201).json(result.rows[0]);
});

// Atualizar usuário
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING id, name, email, created_at",
    [name, email, password, id]
  );
  res.json(result.rows[0]);
});

// Deletar usuário
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));