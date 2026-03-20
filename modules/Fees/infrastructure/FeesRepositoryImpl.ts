import { createClient } from "@/utils/supabase/client";
import { Fee } from "../domain/fee.entity";
import { FeesRepository } from "../domain/fees.repository";

export class FeesRepositoryImpl implements FeesRepository {
  // Inicializamos Supabase y definimos la tabla
  private supabase = createClient();
  private table = "tarifas";

  // REQ13: Registro de tarifa
  async create(fee: Fee): Promise<Fee | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert([
        {
          nombre: fee.nombre,
          monto: fee.monto,
          descripcion: fee.descripcion,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error al registrar la tarifa:", error);
      return null;
    }
    return data;
  }

  // REQ15: Visualización de todas las tarifas
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

  // Método auxiliar para obtener una sola tarifa (útil para cuando hagamos la Modificación REQ14)
  async getById(id: number): Promise<Fee | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al obtener la tarifa:", error);
      return null;
    }
    return data;
  }

  // REQ14: Modificación de tarifa
  async update(id: number, fee: Partial<Fee>): Promise<Fee | null> {
    const { data, error } = await this.supabase
      .from(this.table)
      .update(fee) // Le pasamos los campos que hayan cambiado (nombre, monto o descripción)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar la tarifa:", error);
      return null;
    }
    return data;
  }

  // REQ16: Baja de tarifa
  async delete(id: number): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.table)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar la tarifa:", error);
      return false;
    }
    return true;
  }
}
