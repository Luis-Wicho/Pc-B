import { createClient } from "@/utils/supabase/server"
import { EstablishmentsRepository } from "../domain/establishments.repository"
import { Establishment } from "../domain/establishment.entity"

export class EstablishmentsRepositoryImpl implements EstablishmentsRepository {

  async getAll(): Promise<Establishment[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("establecimientos")
      .select(`
        *,
        tamanio:id_tamanio (tamanio),
        tarifas:id_tarifa (monto_base)
      `);

    if (error) {
      console.error("Error en getAll:", error);
      throw error;
    }

    const mapeados = data.map((e: any) => ({
      ...e,
      nombre_tamanio: e.tamanio?.tamanio || "No especificado",
      monto_tarifa: e.tarifas?.monto_base || 0
    }));

    return mapeados as any[];
  }

  async findById(id: number): Promise<Establishment | null> {
    const supabase = await createClient(); // Cambiado a await directo

    const { data, error } = await supabase
      .from("establecimientos")
      .select("*")
      .eq("id_establecimiento", id)
      .single();

    if (error) {
      console.error("Error en findById:", error);
      return null;
    }

    return data as Establishment;
  }

  async create(establecimiento: Establishment): Promise<Establishment> {
    const supabase = await createClient();
    const { id_establecimiento, ...datosParaInsertar } = establecimiento as any;

    const { data, error } = await supabase
      .from("establecimientos")
      .insert([datosParaInsertar])
      .select()
      .single();

    if (error) {
      console.error("Error en create:", error);
      throw error;
    }

    return data as Establishment;
  }

  async update(establecimiento: Establishment): Promise<Establishment> {
    const supabase = await createClient();
    
    // IMPORTANTE: Separamos el ID del resto de los datos para no intentar sobreescribir la PK
    const { id_establecimiento, ...datosAActualizar } = establecimiento as any;

    const { data, error } = await supabase
      .from("establecimientos")
      .update(datosAActualizar) // Solo enviamos los datos modificables
      .eq("id_establecimiento", id_establecimiento)
      .select()
      .single();

    if (error) {
      console.error("Error en update:", error);
      throw error;
    }

    return data as Establishment;
  }

  async delete(id: number): Promise<void> {
    const supabase = await createClient(); 

    const { error } = await supabase
      .from("establecimientos")
      .delete()
      .eq("id_establecimiento", id);

    if (error) {
      console.error("Error al eliminar en Supabase:", error);
      throw error;
    }
  }
}