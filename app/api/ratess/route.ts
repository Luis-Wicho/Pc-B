import { RateRepositoryImpl } from "@/modules/RateManagement/infraestructure/RateRepositoryImpl";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new RateRepositoryImpl();
    const data = await repository.getAll();

    // Transformamos los datos para que el frontend reciba el formato que espera (bajo, medio, alto)
    // Esto mapea los IDs 1, 2 y 3 de tu tabla a las categorías de la interfaz
    return NextResponse.json({
      bajo: data.find(r => r.id_tarifa === 1)?.monto_base || 0,
      medio: data.find(r => r.id_tarifa === 2)?.monto_base || 0,
      alto: data.find(r => r.id_tarifa === 3)?.monto_base || 0
    });
  } catch (error) {
    console.error("Error en GET /api/ratess:", error);
    return NextResponse.json(
      { error: "Error al obtener las tarifas :(" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const repository = new RateRepositoryImpl();
    const { bajo, medio, alto } = await request.json();

    // Ejecutamos las actualizaciones usando tu lógica de repositorio
    // Se actualiza la columna 'monto_base' para cada ID correspondiente
    await Promise.all([
      repository.update({ id_tarifa: 1, monto_base: bajo }),
      repository.update({ id_tarifa: 2, monto_base: medio }),
      repository.update({ id_tarifa: 3, monto_base: alto })
    ]);

    return NextResponse.json({ success: true, message: "Tarifas actualizadas correctamente" });
  } catch (error: any) {
    console.error("Error en PUT /api/ratess:", error);

    // Mantenemos tu mismo estilo de manejo de errores
    return NextResponse.json(
      { error: "Hubo un fallo en el servidor al intentar actualizar los costos." },
      { status: 500 }
    );
  }
}