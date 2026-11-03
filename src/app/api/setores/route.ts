import { NextResponse } from "next/server";
import { findAllSetores, insertSetor } from "@/repositories/setorRepository";

export async function GET() {
  try {
    const setores = await findAllSetores();

    return NextResponse.json(setores);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar setores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { nome, responsavel, localizacao } = await request.json();

    if (!nome?.trim() || !responsavel?.trim()) {
      return NextResponse.json(
        { error: "Nome e responsável são obrigatórios" },
        { status: 400 }
      );
    }

    const id = await insertSetor(nome, responsavel, localizacao);

    return NextResponse.json({
      id,
      nome,
      responsavel,
      localizacao: localizacao ?? null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar setor" },
      { status: 500 }
    );
  }
}
