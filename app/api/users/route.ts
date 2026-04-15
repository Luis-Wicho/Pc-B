import { UsersRepositoryImpl } from "@/modules/Users/infrastructure/UsersRepositoryImpl"
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
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const repository = new UsersRepositoryImpl()

    const user = await repository.create(body)

    return NextResponse.json(user)

  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      { error: error.message || "Error al crear usuario" },
      { status: 500 }
    )
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const repository = new UsersRepositoryImpl()

    const usuarios = await repository.getAll()

    const usuario = usuarios.find(
      (u) =>
        u.nombre_usuario === body.nombre_usuario &&
        u.contrasena === body.contrasena
    )

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario o contraseña incorrectos" },
        { status: 401 }
      )
    }

    return NextResponse.json(usuario)

  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      { error: "Error en login" },
      { status: 500 }
    )
  }
}