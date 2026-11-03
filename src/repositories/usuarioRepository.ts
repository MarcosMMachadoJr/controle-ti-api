import db from "@/lib/db";
import { Usuario } from "@/types/Usuario";

export async function findAllUsuarios(): Promise<Usuario[]> {
  const [rows] = await db.query(
    "SELECT id, nome, email, criado_em FROM usuarios ORDER BY criado_em DESC"
  );

  return rows as Usuario[];
}

export async function findUsuarioById(id: number): Promise<Usuario | null> {
  const [rows] = await db.query(
    "SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?",
    [id]
  );

  const usuarios = rows as Usuario[];
  return usuarios[0] || null;
}

export async function findUsuarioByEmail(email: string): Promise<Usuario | null> {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );

  const usuarios = rows as Usuario[];
  return usuarios[0] || null;
}

export async function insertUsuario(
  nome: string,
  email: string,
  senha_hash: string
): Promise<number> {
  const [result] = await db.execute(
    "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
    [nome, email, senha_hash]
  );

  return (result as any).insertId;
}

export async function updateUsuario(
  id: number,
  nome: string,
  email: string
): Promise<void> {
  await db.execute(
    "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
    [nome, email, id]
  );
}

export async function removeUsuario(id: number): Promise<void> {
  await db.execute(
    "DELETE FROM usuarios WHERE id = ?",
    [id]
  );
}
