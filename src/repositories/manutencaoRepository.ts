import db from "@/lib/db";
import { Manutencao } from "@/types/Manutencao";

export async function findAllManutencoes(): Promise<Manutencao[]> {
  const [rows] = await db.query(
    `SELECT m.*, e.nome AS equipamento_nome, e.numero_patrimonio, u.nome AS responsavel
     FROM manutencoes m
     JOIN equipamentos e ON e.id = m.equipamento_id
     JOIN usuarios u ON u.id = m.usuario_id
     ORDER BY m.data_abertura DESC`
  );

  return rows as Manutencao[];
}

export async function findManutencaoById(id: number): Promise<Manutencao | null> {
  const [rows] = await db.query(
    "SELECT * FROM manutencoes WHERE id = ?",
    [id]
  );

  const manutencoes = rows as Manutencao[];
  return manutencoes[0] || null;
}

export async function insertManutencao(
  equipamento_id: number,
  usuario_id: number,
  tipo: string,
  descricao: string,
  custo?: number | null
): Promise<number> {
  const [result] = await db.execute(
    `INSERT INTO manutencoes (equipamento_id, usuario_id, tipo, descricao, custo)
     VALUES (?, ?, ?, ?, ?)`,
    [equipamento_id, usuario_id, tipo, descricao, custo ?? null]
  );

  await db.execute(
    "UPDATE equipamentos SET status = 'EM_MANUTENCAO' WHERE id = ?",
    [equipamento_id]
  );

  return (result as any).insertId;
}

export async function updateManutencao(
  id: number,
  tipo: string,
  descricao: string,
  status: string,
  custo?: number | null
): Promise<void> {
  const manutencao = await findManutencaoById(id);
  const dataConclusao = status === "CONCLUIDA" ? new Date() : null;

  await db.execute(
    `UPDATE manutencoes
     SET tipo = ?, descricao = ?, status = ?, custo = ?, data_conclusao = ?
     WHERE id = ?`,
    [tipo, descricao, status, custo ?? null, dataConclusao, id]
  );

  if (manutencao) {
    const [abertas] = await db.query(
      "SELECT id FROM manutencoes WHERE equipamento_id = ? AND status = 'ABERTA'",
      [manutencao.equipamento_id]
    );

    const novoStatus = (abertas as any[]).length > 0 ? "EM_MANUTENCAO" : "ATIVO";

    await db.execute(
      "UPDATE equipamentos SET status = ? WHERE id = ?",
      [novoStatus, manutencao.equipamento_id]
    );
  }
}

export async function removeManutencao(id: number): Promise<void> {
  const manutencao = await findManutencaoById(id);

  await db.execute(
    "DELETE FROM manutencoes WHERE id = ?",
    [id]
  );

  if (manutencao) {
    const [abertas] = await db.query(
      "SELECT id FROM manutencoes WHERE equipamento_id = ? AND status = 'ABERTA'",
      [manutencao.equipamento_id]
    );

    const novoStatus = (abertas as any[]).length > 0 ? "EM_MANUTENCAO" : "ATIVO";

    await db.execute(
      "UPDATE equipamentos SET status = ? WHERE id = ?",
      [novoStatus, manutencao.equipamento_id]
    );
  }
}
