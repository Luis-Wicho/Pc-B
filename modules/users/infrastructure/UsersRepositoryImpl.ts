import { createClient } from "@supabase/supabase-js"
import { User } from "../domain/users.entity"
import { UserRepository } from "../domain/users.repository"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export class UsersRepositoryImpl implements UserRepository {
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("id_usuario", { ascending: true })

    if (error) throw new Error(error.message)
    return data || []
  }

  async getById(id: number): Promise<User | null> {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_usuario", id)
      .single()

    if (error) return null
    return data
  }

  async create(user: Omit<User, "id_usuario">): Promise<User> {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([user])
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async update(id: number, user: Omit<User, "id_usuario">): Promise<User> {
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
    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id_usuario", id)

    if (error) throw new Error(error.message)
  }
}