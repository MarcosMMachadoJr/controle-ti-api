import { NextResponse } from "next/server";
import { findEquipamentosPorStatus } from "@/repositories/relatorioRepository";

export async function GET() {
  try {
    const relatorio = await findEquipamentosPorStatus();

    return NextResponse.json(relatorio);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar relatório de equipamentos por status" },
      { status: 500 }
    );
  }
}
