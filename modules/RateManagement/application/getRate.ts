import { RateRepository } from "../domain/RateRepository";

export const getRates = async (repo: RateRepository) => {
  return await repo.getAll();
};