import db from "@/lib/db";
import { Setor } from "@/types/Setor";

export async function findAllSetores(): Promise<Setor[]> {
  const [rows] = await db.query(
    "SELECT * FROM setores ORDER BY criado_em DESC"
  );

  return rows as Setor[];
}

export async function findSetorById(id: number): Promise<Setor | null> {
  const [rows] = await db.query(
    "SELECT * FROM setores WHERE id = ?",
    [id]
  );

  const setores = rows as Setor[];
  return setores[0] || null;
}

export async function insertSetor(
  nome: string,
  responsavel: string,
  localizacao?: string | null
): Promise<number> {
  const [result] = await db.execute(
    "INSERT INTO setores (nome, responsavel, localizacao) VALUES (?, ?, ?)",
    [nome, responsavel, localizacao ?? null]
  );

  return (result as any).insertId;
}

export async function updateSetor(
  id: number,
  nome: string,
  responsavel: string,
  localizacao?: string | null
): Promise<void> {
  await db.execute(
    "UPDATE setores SET nome = ?, responsavel = ?, localizacao = ? WHERE id = ?",
    [nome, responsavel, localizacao ?? null, id]
  );
}

export async function removeSetor(id: number): Promise<void> {
  await db.execute(
    "DELETE FROM setores WHERE id = ?",
    [id]
  );
}
