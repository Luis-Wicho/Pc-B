
import { Activity } from "./activity.entity";

export interface ActivityRepository {
  create(activity: Activity): Promise<Activity>;
  update(id: string, activity: Activity): Promise<Activity>;
  getAll(): Promise<Activity[]>;
}