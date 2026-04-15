import { ActivityRepository } from "../domain/activity.repository";

export class CreateActivity {
  constructor(private repo: ActivityRepository) {}

  async execute(activity: any) {
    if (!activity.title || !activity.date) {
      throw new Error("Campos obligatorios");
    }

    return await this.repo.create(activity);
  }
}