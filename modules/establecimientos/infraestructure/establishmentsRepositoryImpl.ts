import { EstablishmentsRepository } from "../domain/establishments.repository"
import { Establecimiento } from "../domain/establecimiento.entity"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export class EstablishmentsRepositoryImpl implements EstablishmentsRepository {

  async getAll(): Promise<Establecimiento[]> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .select("*")

    if (error) throw error

    return data as Establecimiento[]
  }

  async findById(id: number): Promise<Establecimiento | null> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .select("*")
      .eq("id_establecimiento", id)
      .single()

    if (error) return null

    return data as Establecimiento
  }

  async create(establecimiento: Establecimiento): Promise<Establecimiento> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .insert(establecimiento)
      .select()
      .single()

    if (error) throw error

    return data as Establecimiento
  }

  async update(establecimiento: Establecimiento): Promise<Establecimiento> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .update(establecimiento)
      .eq("id_establecimiento", establecimiento.id_establecimiento)
      .select()
      .single()

    if (error) throw error

    return data as Establecimiento
  }

  async delete(id: number): Promise<void> {

    const supabase = await createClient(cookies())

    const { error } = await supabase
      .from("establecimientos")
      .delete()
      .eq("id_establecimiento", id)

    if (error) throw error
  }
}