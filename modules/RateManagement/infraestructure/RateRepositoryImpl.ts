import { createClient } from "@supabase/supabase-js";
import { Rate } from "../domain/Rate";
import { RateRepository } from "../domain/RateRepository";

// Inicializamos el cliente de Supabase para el servidor
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class RateRepositoryImpl implements RateRepository {

  async getAll(): Promise<Rate[]> {
    // CAMBIO CLAVE: Conexión directa a la tabla, no usar fetch
    const { data, error } = await supabase
      .from("tarifas")
      .select("*")
      .order("id_tarifa", { ascending: true });

    if (error) {
      console.error("Error en Supabase getAll:", error);
      throw error;
    }

    return data as Rate[];
  }

  async update(rate: Rate): Promise<void> {
    // CAMBIO CLAVE: Actualización directa en la tabla
    const { error } = await supabase
      .from("tarifas")
      .update({ monto_base: rate.monto_base })
      .eq("id_tarifa", rate.id_tarifa);

    if (error) {
      console.error("Error en Supabase update:", error);
      throw error;
    }
  }

  // Puedes dejar los demás métodos vacíos por ahora si no los usas
  async getById(id: number): Promise<Rate | null> { return null; }
  async create(rate: Rate): Promise<void> { }
  async delete(id: number): Promise<void> { }
}