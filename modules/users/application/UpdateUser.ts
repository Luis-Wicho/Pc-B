import { User } from "@supabase/supabase-js"
import { UserRepository } from "../domain/users.repository"

export class UpdateUser {
  constructor(private repository: UserRepository) {}

  async execute(id: number, user: Omit<User, "id_usuario">): Promise<User> {
    return this.repository.update(id, user)
  }
}