import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { User } from "../domain/users.entity"
import { UserRepository } from "../domain/users.repository"



export class UsersRepositoryImpl implements UserRepository {
  async getAll(): Promise<User[]> {

   const supabase = await createClient(cookies())
    
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
  }

  async getById(id: number): Promise<User | null> {
    const supabase = await createClient(cookies())
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
  }

  async create(user: Omit<User, "id_usuario">): Promise<User> {
    const supabase = await createClient(cookies())
    const { data, error } = await supabase
      .from("usuarios")
      .insert([user])
  }

  async update(id: number, user: Omit<User, "id_usuario">): Promise<User> {
    const supabase = await createClient(cookies())
    const { data, error } = await supabase
      .from("usuarios")
      .update(user)
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