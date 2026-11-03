export type Setor = {
  id: number;
  nome: string;
  responsavel: string;
  localizacao?: string | null;
  criado_em?: Date;
};
