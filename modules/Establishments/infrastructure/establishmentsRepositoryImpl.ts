import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { EstablishmentsRepository } from "../domain/establishments.repository"
import { Establishment } from "../domain/establishment.entity"

export class EstablishmentsRepositoryImpl implements EstablishmentsRepository {

  async getAll(): Promise<Establishment[]> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .select("*")
console.log(data, error)
    if (error) throw error

    return data as Establishment[]
  }

  async findById(id: number): Promise<Establishment | null> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .select("*")
      .eq("id_establecimiento", id)
      .single()

    if (error) return null

    return data as Establishment
  }

  async create(establecimiento: Establishment): Promise<Establishment> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .insert(establecimiento)
      .select()
      .single()

    if (error) throw error

    return data as Establishment
  }

  async update(establecimiento: Establishment): Promise<Establishment> {

    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("establecimientos")
      .update(establecimiento)
      .eq("id_establecimiento", establecimiento.id_establecimiento)
      .select()
      .single()

    if (error) throw error

    return data as Establishment
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