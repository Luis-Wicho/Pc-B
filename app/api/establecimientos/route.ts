import { NextResponse } from "next/server"
import { EstablishmentsRepositoryImpl } from "@/modules/establecimientos/infraestructure/establishmentsRepositoryImpl"

export async function GET() {

  try {

    const repository = new EstablishmentsRepositoryImpl()

    const establecimientos = await repository.getAll()

    return NextResponse.json(establecimientos)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Error al obtener establecimientos :(" },
      { status: 500 }
    )

  }

}