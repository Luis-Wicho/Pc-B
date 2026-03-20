import { Fee } from "../domain/fee.entity";
import { FeesRepository } from "../domain/fees.repository";

export class GetFeesUseCase {
  constructor(private readonly feesRepository: FeesRepository) {}

  async execute(): Promise<Fee[]> {
    return await this.feesRepository.getAll();
  }
}