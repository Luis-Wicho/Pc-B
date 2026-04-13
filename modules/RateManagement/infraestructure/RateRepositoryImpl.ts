import { Rate } from "../domain/Rate";
import { RateRepository } from "../domain/RateRepository";

export class RateRepositoryImpl implements RateRepository {

  async getAll(): Promise<Rate[]> {
    const res = await fetch("/api/rates");
    return await res.json();
  }

  async getById(id: number): Promise<Rate | null> {
    const res = await fetch(`/api/rates/${id}`);
    return await res.json();
  }

  async create(rate: Rate): Promise<void> {
    await fetch("/api/rates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rate),
    });
  }

  async update(rate: Rate): Promise<void> {
    await fetch(`/api/rates/${rate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rate),
    });
  }

  async delete(id: number): Promise<void> {
    await fetch(`/api/rates/${id}`, {
      method: "DELETE",
    });
  }
}