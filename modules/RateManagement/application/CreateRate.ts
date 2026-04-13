import { Rate } from "../domain/Rate";
import { RateRepository } from "../domain/RateRepository";

export const createRate = async (
  repo: RateRepository,
  rate: Rate
) => {
  if (!rate.name || rate.amount <= 0) {
    throw new Error("Invalid data");
  }

  await repo.create(rate);
};