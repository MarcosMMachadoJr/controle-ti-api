import db from "@/lib/db";
import { Equipamento } from "@/types/Equipamento";

export async function findAllEquipamentos(): Promise<Equipamento[]> {
  const [rows] = await db.query(
    `SELECT e.*, s.nome AS setor_nome
     FROM equipamentos e
     JOIN setores s ON s.id = e.setor_id
     ORDER BY e.criado_em DESC`
  );

  return rows as Equipamento[];
}

export async function findEquipamentoById(id: number): Promise<Equipamento | null> {
  const [rows] = await db.query(
    `SELECT e.*, s.nome AS setor_nome
     FROM equipamentos e
     JOIN setores s ON s.id = e.setor_id
     WHERE e.id = ?`,
    [id]
  );

  const equipamentos = rows as Equipamento[];
  return equipamentos[0] || null;
}

export async function insertEquipamento(
  equipamento: Omit<Equipamento, "id" | "criado_em" | "setor_nome">
): Promise<number> {
  const [result] = await db.execute(
    `INSERT INTO equipamentos
      (nome, tipo, numero_patrimonio, marca, modelo, numero_serie, status, data_aquisicao, observacoes, setor_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      equipamento.nome,
      equipamento.tipo,
      equipamento.numero_patrimonio,
      equipamento.marca,
      equipamento.modelo,
      equipamento.numero_serie ?? null,
      equipamento.status ?? "ATIVO",
      equipamento.data_aquisicao ?? null,
      equipamento.observacoes ?? null,
      equipamento.setor_id,
    ]
  );

  return (result as any).insertId;
}

export async function updateEquipamento(
  id: number,
  equipamento: Omit<Equipamento, "id" | "criado_em" | "setor_nome">
): Promise<void> {
  await db.execute(
    `UPDATE equipamentos
     SET nome = ?, tipo = ?, numero_patrimonio = ?, marca = ?, modelo = ?,
         numero_serie = ?, status = ?, data_aquisicao = ?, observacoes = ?, setor_id = ?
     WHERE id = ?`,
    [
      equipamento.nome,
      equipamento.tipo,
      equipamento.numero_patrimonio,
      equipamento.marca,
      equipamento.modelo,
      equipamento.numero_serie ?? null,
      equipamento.status ?? "ATIVO",
      equipamento.data_aquisicao ?? null,
      equipamento.observacoes ?? null,
      equipamento.setor_id,
      id,
    ]
  );
}

export async function removeEquipamento(id: number): Promise<void> {
  await db.execute(
    "DELETE FROM equipamentos WHERE id = ?",
    [id]
  );
}
