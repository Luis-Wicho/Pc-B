import { NextResponse } from "next/server"
import { EstablecimientoRepositoryImpl } from "@/modules/establecimientos/infraestructure/establecimientoRepositoryImpl"

export async function GET() {

  try {

    const repository = new EstablecimientoRepositoryImpl()

    const establecimientos = await repository.getAll()

    return NextResponse.json(establecimientos)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error al obtener establecimientos" },
      { status: 500 }
    )

  }

}