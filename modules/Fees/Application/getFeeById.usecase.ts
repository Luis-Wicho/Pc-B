import { Fee } from "../domain/fee.entity";
import { FeesRepository } from "../domain/fees.repository";

export class GetFeeByIdUseCase {
  constructor(private readonly feesRepository: FeesRepository) {}

  async execute(id: number): Promise<Fee | null> {
    return await this.feesRepository.getById(id);
  }
}