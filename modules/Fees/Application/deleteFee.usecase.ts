import { FeesRepository } from "../domain/fees.repository";

export class DeleteFeeUseCase {
  constructor(private readonly feesRepository: FeesRepository) {}

  async execute(id: number): Promise<boolean> {
    // Aquí podrías validar si la tarifa está siendo usada en alguna Payment_order
    // antes de permitir eliminarla, para mantener la integridad de la base de datos.
    return await this.feesRepository.delete(id);
  }
}