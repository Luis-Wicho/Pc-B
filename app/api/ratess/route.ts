import { EstablishmentsRepositoryImpl } from "@/modules/Establishments/infrastructure/establishmentsRepositoryImpl";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const repository = new EstablishmentsRepositoryImpl();

    // 🔹 Obtener establecimientos
    const establecimientos = await repository.getAll();

    // 🔹 Obtener tarifas
    const { data: tarifas, error } = await supabase
      .from("rates")
      .select("*");

    if (error) throw error;

    // 🔹 Unir datos (relación manual)
    const resultado = establecimientos.map((est: any) => ({
      ...est,
      tarifas: tarifas.filter(
        (t: any) => t.establishment_id === est.id
      ),
    }));

    return NextResponse.json(resultado);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener datos :(" },
      { status: 500 }
    );
  }
}