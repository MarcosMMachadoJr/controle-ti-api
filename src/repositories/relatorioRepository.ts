import db from "@/lib/db";

export async function findEquipamentosPorSetor() {
  const [rows] = await db.query(
    `SELECT s.id AS setor_id, s.nome AS setor, COUNT(e.id) AS total,
            SUM(e.status = 'ATIVO') AS ativos,
            SUM(e.status = 'EM_MANUTENCAO') AS em_manutencao,
            SUM(e.status = 'INATIVO') AS inativos,
            SUM(e.status = 'BAIXADO') AS baixados
     FROM setores s
     LEFT JOIN equipamentos e ON e.setor_id = s.id
     GROUP BY s.id, s.nome
     ORDER BY s.nome`
  );

  return rows;
}

export async function findEquipamentosPorStatus() {
  const [rows] = await db.query(
    "SELECT status, COUNT(*) AS total FROM equipamentos GROUP BY status"
  );

  return rows;
}

export async function findRelatorioManutencoes() {
  const [rows] = await db.query(
    `SELECT m.id, m.tipo, m.status, m.custo, m.data_abertura, m.data_conclusao,
            e.nome AS equipamento, e.numero_patrimonio, s.nome AS setor
     FROM manutencoes m
     JOIN equipamentos e ON e.id = m.equipamento_id
     JOIN setores s ON s.id = e.setor_id
     ORDER BY m.data_abertura DESC`
  );

  return rows;
}
