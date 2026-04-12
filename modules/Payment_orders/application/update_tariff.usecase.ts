import { Tariff } from "../domain/tariff.entity";
import { TariffRepositoryImpl } from "../infraestructure/tariff_repository.impl";
export class UpdateTariff {

  constructor(private repo: TariffRepositoryImpl) {}

  async execute(tariff: Tariff) {
    const existing = await this.repo.getById(tariff.id);

    if (!existing) {
      throw new Error("Tariff not found");
    }

    return await this.repo.update(tariff);
  }
}