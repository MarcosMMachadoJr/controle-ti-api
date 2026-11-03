import { NextResponse } from "next/server";
import { findEquipamentosPorSetor } from "@/repositories/relatorioRepository";

export async function GET() {
  try {
    const relatorio = await findEquipamentosPorSetor();

    return NextResponse.json(relatorio);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar relatório de equipamentos por setor" },
      { status: 500 }
    );
  }
}
