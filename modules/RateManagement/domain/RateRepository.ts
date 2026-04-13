import { Rate } from "./Rate";

export interface RateRepository {
  getAll(): Promise<Rate[]>;
  getById(id: number): Promise<Rate | null>;
  create(rate: Rate): Promise<void>;
  update(rate: Rate): Promise<void>;
  delete(id: number): Promise<void>;
}