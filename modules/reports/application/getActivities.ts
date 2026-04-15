export class GetActivities {
  constructor(private repo: any) {}

  async execute() {
    return await this.repo.getAll();
  }
}