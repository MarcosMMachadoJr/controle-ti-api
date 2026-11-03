import { NextResponse } from "next/server";
import {
  findManutencaoById,
  updateManutencao,
  removeManutencao,
} from "@/repositories/manutencaoRepository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const manutencaoId = Number(id);

    const manutencao = await findManutencaoById(manutencaoId);

    if (!manutencao) {
      return NextResponse.json(
        { error: "Manutenção não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(manutencao);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar manutenção" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const manutencaoId = Number(id);
    const { tipo, descricao, status, custo } = await request.json();

    if (!tipo?.trim() || !descricao?.trim()) {
      return NextResponse.json(
        { error: "Tipo e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    await updateManutencao(
      manutencaoId,
      tipo,
      descricao,
      status ?? "ABERTA",
      custo
    );

    return NextResponse.json({
      id: manutencaoId,
      tipo,
      descricao,
      status: status ?? "ABERTA",
      custo: custo ?? null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao atualizar manutenção" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const manutencaoId = Number(id);

    await removeManutencao(manutencaoId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao excluir manutenção" },
      { status: 500 }
    );
  }
}
