import { NextResponse } from "next/server";
import {
  findAllManutencoes,
  insertManutencao,
} from "@/repositories/manutencaoRepository";

export async function GET() {
  try {
    const manutencoes = await findAllManutencoes();

    return NextResponse.json(manutencoes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar manutenções" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { equipamento_id, usuario_id, tipo, descricao, custo } =
      await request.json();

    if (!equipamento_id || !usuario_id || !tipo?.trim() || !descricao?.trim()) {
      return NextResponse.json(
        { error: "Equipamento, usuário, tipo e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    const id = await insertManutencao(
      Number(equipamento_id),
      Number(usuario_id),
      tipo,
      descricao,
      custo
    );

    return NextResponse.json({
      id,
      equipamento_id: Number(equipamento_id),
      usuario_id: Number(usuario_id),
      tipo,
      descricao,
      custo: custo ?? null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar manutenção" },
      { status: 500 }
    );
  }
}
