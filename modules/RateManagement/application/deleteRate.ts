import { RateRepository } from "../domain/RateRepository";

export const deleteRate = async (
  repo: RateRepository,
  id: number
) => {
  await repo.delete(id);
};