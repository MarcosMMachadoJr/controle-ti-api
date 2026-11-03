import { NextResponse } from "next/server";
import { findAllUsuarios } from "@/repositories/usuarioRepository";

export async function GET() {
  try {
    const usuarios = await findAllUsuarios();

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
