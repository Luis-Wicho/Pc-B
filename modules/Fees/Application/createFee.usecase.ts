import { Fee } from "../domain/fee.entity";
import { FeesRepository } from "../domain/fees.repository";

export class CreateFeeUseCase {
  constructor(private readonly feesRepository: FeesRepository) {}

  async execute(fee: Fee): Promise<Fee | null> {
    // Aquí puedes agregar lógica de negocio adicional, por ejemplo:
    if (fee.monto <= 0) {
      throw new Error("El monto de la tarifa debe ser mayor a 0");
    }
    
    return await this.feesRepository.create(fee);
  }
}