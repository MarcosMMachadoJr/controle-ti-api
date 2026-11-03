import { NextResponse } from "next/server";
import {
  findUsuarioById,
  updateUsuario,
  removeUsuario,
} from "@/repositories/usuarioRepository";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const usuarioId = Number(id);

    const usuario = await findUsuarioById(usuarioId);

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
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
    const usuarioId = Number(id);
    const { nome, email } = await request.json();

    if (!nome?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Nome e e-mail são obrigatórios" },
        { status: 400 }
      );
    }

    await updateUsuario(usuarioId, nome, email);

    return NextResponse.json({
      id: usuarioId,
      nome,
      email,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
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
    const usuarioId = Number(id);

    await removeUsuario(usuarioId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}
