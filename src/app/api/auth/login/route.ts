import { NextResponse } from "next/server";
import { findUsuarioByEmail } from "@/repositories/usuarioRepository";

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    if (!email?.trim() || !senha?.trim()) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const usuario = await findUsuarioByEmail(email);

    if (!usuario || usuario.senha_hash !== senha) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao realizar login" },
      { status: 500 }
    );
  }
}
