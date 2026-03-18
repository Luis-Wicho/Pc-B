import { User } from "./users.entity"

export interface UserRepository {
  getAll(): Promise<User[]>
  getById(id: number): Promise<User | null>
  create(user: Omit<User, "id_usuario">): Promise<User>
  update(id: number, user: Omit<User, "id_usuario">): Promise<User>
  delete(id: number): Promise<void>
}