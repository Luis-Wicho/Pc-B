import { User } from "../domain/users.entity"
import { UserRepository } from "../domain/users.repository"

export class GetUserById {
  constructor(private repository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    return this.repository.getById(id)
  }
}