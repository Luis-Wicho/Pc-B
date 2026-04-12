import { Tariff } from "../domain/tariff.entity";


export class TariffRepositoryImpl implements TariffRepositoryImpl {

  private tariffs: Tariff[] = [];

  async create(tariff: Tariff): Promise<Tariff> {
    this.tariffs.push(tariff);
    return tariff;
  }

  async update(tariff: Tariff): Promise<Tariff> {
    this.tariffs = this.tariffs.map(t => t.id === tariff.id ? tariff : t);
    return tariff;
  }

  async delete(id: string): Promise<void> {
    this.tariffs = this.tariffs.filter(t => t.id !== id);
  }

  async getAll(): Promise<Tariff[]> {
    return this.tariffs;
  }

  async getById(id: string): Promise<Tariff | null> {
    return this.tariffs.find(t => t.id === id) || null;
  }
}