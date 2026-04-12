import { TariffRepository } from "../../domain/repositories/tariff.repository";

export class GetTariffs {
  constructor(private repo: TariffRepository) {}

  async execute() {
    return await this.repo.getAll();
  }
}