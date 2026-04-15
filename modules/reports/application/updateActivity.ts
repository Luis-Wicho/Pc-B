export class UpdateActivity {
  constructor(private repo: any) {}

  async execute(id: string, data: any) {
    return await this.repo.update(id, data);
  }
}