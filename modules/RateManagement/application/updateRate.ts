import { Rate } from "../domain/Rate";
import { RateRepository } from "../domain/RateRepository";

export const updateRate = async (
  repo: RateRepository,
  rate: Rate
) => {
  await repo.update(rate);
};