import { Fee } from "../domain/fee.entity";
import { FeesRepository } from "../domain/fees.repository";

export class UpdateFeeUseCase {
  constructor(private readonly feesRepository: FeesRepository) {}

  async execute(id: number, feeUpdate: Partial<Fee>): Promise<Fee | null> {
    return await this.feesRepository.update(id, feeUpdate);
  }
}