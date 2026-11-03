import { NextResponse } from "next/server";
import { findRelatorioManutencoes } from "@/repositories/relatorioRepository";

export async function GET() {
  try {
    const relatorio = await findRelatorioManutencoes();

    return NextResponse.json(relatorio);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar relatório de manutenções" },
      { status: 500 }
    );
  }
}
