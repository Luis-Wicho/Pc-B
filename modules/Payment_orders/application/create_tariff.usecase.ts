

export class createtariff {
  constructor(private repo: tariffrepository) {}

  async execute(tariff: tariff) {
    const existing = await this.repo.getAll();

    if (existing.find((t: tariff) => t.name === tariff.name)) {
      throw new Error("Tariff already exists");
    }

    return await this.repo.create(tariff);
  }
}
