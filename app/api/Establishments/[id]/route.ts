import { EstablishmentsRepositoryImpl } from "@/modules/Establishments/infrastructure/establishmentsRepositoryImpl";
import { NextResponse } from "next/server";

const repository = new EstablishmentsRepositoryImpl();
// GET: Obtener un solo establecimiento por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    const establecimiento = await repository.findById(id);

    if (!establecimiento) {
      return NextResponse.json({ error: "Establecimiento no encontrado" }, { status: 404 });
    }

    return NextResponse.json(establecimiento);
  } catch (error) {
    console.error("Error al obtener el establecimiento:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PUT: Actualizar un establecimiento existente
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    // Combinamos el ID de la URL con los datos del cuerpo para asegurar consistencia
    const establecimientoActualizado = await repository.update({
      ...body,
      id_establecimiento: id,
    });

    return NextResponse.json(establecimientoActualizado);
  } catch (error) {
    console.error("Error al actualizar:", error);
    return NextResponse.json({ error: "No se pudo actualizar el registro" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Definimos params como Promesa
) {
  try {
    const repository = new EstablishmentsRepositoryImpl();
    
    // 2. Esperamos a que los params se resuelvan
    const resolvedParams = await params; 
    const id = Number(resolvedParams.id);

    // Validación de seguridad por si el ID no es un número
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    await repository.delete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return NextResponse.json({ error: "No se pudo eliminar el registro" }, { status: 500 });
  }
}