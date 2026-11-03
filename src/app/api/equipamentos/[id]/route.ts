import { NextResponse } from "next/server";
import {
  findEquipamentoById,
  updateEquipamento,
  removeEquipamento,
} from "@/repositories/equipamentoRepository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipamentoId = Number(id);

    const equipamento = await findEquipamentoById(equipamentoId);

    if (!equipamento) {
      return NextResponse.json(
        { error: "Equipamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(equipamento);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar equipamento" },
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
    const equipamentoId = Number(id);
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

    await updateEquipamento(equipamentoId, {
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
      id: equipamentoId,
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
      { error: "Erro ao atualizar equipamento" },
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
    const equipamentoId = Number(id);

    await removeEquipamento(equipamentoId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao excluir equipamento" },
      { status: 500 }
    );
  }
}
