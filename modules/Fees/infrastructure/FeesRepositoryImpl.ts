import { createClient } from "@/utils/supabase/client";
import { Fee } from "../domain/fee.entity";
import { FeesRepository } from "../domain/fees.repository";

// OJO AQUÍ: Usamos "implements", no "extends"
export class FeesRepositoryImpl implements FeesRepository {
  private supabase = createClient();
  private table = "tarifas"; // El nombre de tu tabla en Supabase

  // ... (Aquí van los métodos de create, getAll, getById, update, delete)
  // Te pongo el getAll para que compares
  async getAll(): Promise<Fee[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener las tarifas:", error);
      return [];
    }
    return data || [];
  }
  
  // ... resto de los métodos
}