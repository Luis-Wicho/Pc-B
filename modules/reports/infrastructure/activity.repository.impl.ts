
import { ActivityRepository } from "../domain/activity.repository";

let activities: any[] = [];

export class ActivityRepositoryImpl implements ActivityRepository {

  async create(activity: any) {
    const newActivity = { ...activity, id: Date.now().toString() };
    activities.push(newActivity);
    return newActivity;
  }

  async update(id: string, activity: any) {
    const index = activities.findIndex(a => a.id === id);
    activities[index] = { ...activities[index], ...activity };
    return activities[index];
  }

  async getAll() {
    return activities;
  }
}