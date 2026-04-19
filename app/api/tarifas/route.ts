import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient(); // Sin await
    
    const { data, error } = await (await supabase)
      .from("tarifas")
      .select("*");

    if (error) {
      console.error("Error en Supabase:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error en GET /api/tarifas:", error);
    return NextResponse.json(
      { error: "Error al obtener las tarifas" },
      { status: 500 }
    );
  }
}