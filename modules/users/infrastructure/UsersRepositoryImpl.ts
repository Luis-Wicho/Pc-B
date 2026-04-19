import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { User } from "../domain/users.entity"
import { UserRepository } from "../domain/users.repository"

export class UsersRepositoryImpl implements UserRepository {
  findById(id: number) {
    throw new Error("Method not implemented.")
  }

  async getAll(): Promise<User[]> {
    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")

    if (error) throw new Error(error.message)

    return data ?? []
  }

  async getById(id: number): Promise<User | null> {
    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_usuario", id)
      .single()

    if (error) return null

    return data
  }

  async create(user: Omit<User, "id_usuario">): Promise<User> {
    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("usuarios")
      .insert([user])
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  }

  async update(id: number, user: Omit<User, "id_usuario">): Promise<User> {
    const supabase = await createClient(cookies())

    const { data, error } = await supabase
      .from("usuarios")
      .update(user)
      .eq("id_usuario", id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  }

  async delete(id: number): Promise<void> {
    const supabase = await createClient(cookies())

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id_usuario", id)

    if (error) throw new Error(error.message)
  }
}