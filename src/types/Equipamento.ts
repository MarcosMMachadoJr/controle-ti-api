export type Equipamento = {
  id: number;
  nome: string;
  tipo: string;
  numero_patrimonio: string;
  marca: string;
  modelo: string;
  numero_serie?: string | null;
  status?: string;
  data_aquisicao?: string | Date | null;
  observacoes?: string | null;
  setor_id: number;
  setor_nome?: string;
  criado_em?: Date;
};
