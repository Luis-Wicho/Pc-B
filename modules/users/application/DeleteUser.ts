import { UserRepository } from "../domain/users.repository"

export class DeleteUser {
  constructor(private repository: UserRepository) {}

  async execute(id: number): Promise<void> {
    return this.repository.delete(id)
  }
}