import { NextResponse } from "next/server";
import { insertUsuario } from "@/repositories/usuarioRepository";

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json();

    if (!nome?.trim() || !email?.trim() || !senha?.trim()) {
      return NextResponse.json(
        { error: "Nome, e-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const id = await insertUsuario(nome, email, senha);

    return NextResponse.json({
      id,
      nome,
      email,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      { status: 500 }
    );
  }
}
