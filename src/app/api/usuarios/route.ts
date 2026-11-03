import { NextResponse } from "next/server";
import {
  findAllUsuarios,
  insertUsuario,
} from "@/repositories/usuarioRepository";

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
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
