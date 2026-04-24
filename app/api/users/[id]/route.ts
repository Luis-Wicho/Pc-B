import { UsersRepositoryImpl } from "@/modules/Users/infrastructure/UsersRepositoryImpl";
import { NextResponse } from "next/server";

// Sugerencia: Si UsersRepositoryImpl no tiene estado pesado, esto está bien. 
// Si maneja conexiones a DB, asegúrate de que el Impl use un Singleton internamente.
const repository = new UsersRepositoryImpl();

// GET: Obtener un usuario por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (isNaN(id)) {
      return NextResponse.json({ error: "El ID debe ser un número válido" }, { status: 400 });
    }

    const usuario = await repository.getById(id);

    if (!usuario) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error("Error en GET [User ID]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PUT: Actualizar un usuario
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    const body = await request.json();

    // Validación básica: Verificar que el body no esté vacío
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "No se proporcionaron datos para actualizar" }, { status: 400 });
    }

    // Es más seguro mapear los campos específicos que permites actualizar
    const usuarioActualizado = await repository.update(id, {
      ...body // O mejor: nombre: body.nombre, email: body.email
    });

    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    console.error("Error en PUT [User ID]:", error);
    return NextResponse.json({ error: "No se pudo actualizar el usuario" }, { status: 500 });
  }
}

// DELETE: Eliminar un usuario
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    // Opcional: Verificar si el usuario existe antes de intentar borrarlo
    const existe = await repository.getById(id);
    if (!existe) {
      return NextResponse.json({ error: "El usuario que intenta eliminar no existe" }, { status: 404 });
    }

    await repository.delete(id);

    return NextResponse.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error en DELETE [User ID]:", error);
    return NextResponse.json({ error: "No se pudo eliminar el usuario" }, { status: 500 });
  }
}