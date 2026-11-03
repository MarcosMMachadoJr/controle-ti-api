export type Manutencao = {
  id: number;
  equipamento_id: number;
  usuario_id: number;
  tipo: string;
  descricao: string;
  status?: string;
  custo?: number | null;
  data_abertura?: Date;
  data_conclusao?: Date | null;
  equipamento_nome?: string;
  numero_patrimonio?: string;
  responsavel?: string;
};
