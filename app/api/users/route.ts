import { UsersRepositoryImpl } from "@/modules/userS/infrastructure/UsersRepositoryImpl"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const repository = new UsersRepositoryImpl()
    const usuarios = await repository.getAll()

    return NextResponse.json(usuarios)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    )
  }
}