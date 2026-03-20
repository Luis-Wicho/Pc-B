import { FeesRepositoryImpl } from "@/modules/Fees/infrastructure/FeesRepositoryImpl";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new FeesRepositoryImpl();
    const fees = await repository.getAll();

    return NextResponse.json(fees);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener las tarifas :(" },
      { status: 500 }
    );
  }
}