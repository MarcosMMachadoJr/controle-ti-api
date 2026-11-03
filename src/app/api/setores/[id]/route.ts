import { NextResponse } from "next/server";
import {
  findSetorById,
  updateSetor,
  removeSetor,
} from "@/repositories/setorRepository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const setorId = Number(id);

    const setor = await findSetorById(setorId);

    if (!setor) {
      return NextResponse.json(
        { error: "Setor não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(setor);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar setor" },
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
    const setorId = Number(id);
    const { nome, responsavel, localizacao } = await request.json();

    if (!nome?.trim() || !responsavel?.trim()) {
      return NextResponse.json(
        { error: "Nome e responsável são obrigatórios" },
        { status: 400 }
      );
    }

    await updateSetor(setorId, nome, responsavel, localizacao);

    return NextResponse.json({
      id: setorId,
      nome,
      responsavel,
      localizacao: localizacao ?? null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao atualizar setor" },
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
    const setorId = Number(id);

    await removeSetor(setorId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao excluir setor" },
      { status: 500 }
    );
  }
}
