

export class deletetariff {
  constructor(private repo: tariffrepository) {}

  async execute(id: string) {
    const existing = await this.repo.getById(id);

    if (!existing) throw new Error("Tariff not found");

    await this.repo.delete(id);
  }
}