import { NextResponse } from "next/server";
import {
  findAllEquipamentos,
  insertEquipamento,
} from "@/repositories/equipamentoRepository";

export async function GET() {
  try {
    const equipamentos = await findAllEquipamentos();

    return NextResponse.json(equipamentos);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar equipamentos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nome,
      tipo,
      numero_patrimonio,
      marca,
      modelo,
      numero_serie,
      status,
      data_aquisicao,
      observacoes,
      setor_id,
    } = body;

    if (
      !nome?.trim() ||
      !tipo?.trim() ||
      !numero_patrimonio?.trim() ||
      !marca?.trim() ||
      !modelo?.trim() ||
      !setor_id
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios do equipamento não preenchidos" },
        { status: 400 }
      );
    }

    const id = await insertEquipamento({
      nome,
      tipo,
      numero_patrimonio,
      marca,
      modelo,
      numero_serie,
      status,
      data_aquisicao,
      observacoes,
      setor_id: Number(setor_id),
    });

    return NextResponse.json({
      id,
      nome,
      tipo,
      numero_patrimonio,
      marca,
      modelo,
      status: status ?? "ATIVO",
      setor_id: Number(setor_id),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar equipamento" },
      { status: 500 }
    );
  }
}
