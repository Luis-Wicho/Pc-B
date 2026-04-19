import { EstablishmentsRepositoryImpl } from "@/modules/Establishments/infrastructure/establishmentsRepositoryImpl"
import { NextResponse } from "next/server"

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

export async function POST(request: Request) {
  try {
    const repository = new EstablishmentsRepositoryImpl();
    const body = await request.json();
    
    const nuevoEstablecimiento = await repository.create(body);
    
    return NextResponse.json(nuevoEstablecimiento);
  } catch (error: any) {
    console.error("Error en POST /api/Establishments:", error);

    // 1. Detectar error de llave duplicada (PostgreSQL code 23505)
    // El error puede venir en el objeto directamente o dentro de 'error.code'
    if (error.code === '23505' || error.message?.includes('already exists')) {
      return NextResponse.json(
        { error: `El número de expediente ya está registrado en el sistema.` },
        { status: 400 } // Error de cliente (Bad Request)
      );
    }

    // 2. Error genérico para otros fallos
    return NextResponse.json(
      { error: "Hubo un fallo en el servidor al intentar registrar." },
      { status: 500 }
    );
  }
}