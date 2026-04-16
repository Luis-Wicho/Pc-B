import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🔹 PUT → actualizar tarifa
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, amount, status } = body;

    const { error } = await supabase
      .from("rates")
      .update({ name, amount, status })
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Tarifa actualizada correctamente" });

  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar tarifa" },
      { status: 500 }
    );
  }
}

// 🔹 DELETE → eliminar tarifa
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("rates")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Tarifa eliminada correctamente" });

  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar tarifa" },
      { status: 500 }
    );
  }
}