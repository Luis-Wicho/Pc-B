import { createClient } from "@/utils/supabase/client";
import { Fee } from "../domain/fee.entity";
import { FeesRepository } from "../domain/fees.repository";


export class FeesRepositoryImpl implements FeesRepository {
  create(fee: Fee): Promise<Fee | null> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<Fee | null> {
    throw new Error("Method not implemented.");
  }
  update(id: number, fee: Partial<Fee>): Promise<Fee | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  private supabase = createClient();
  private table = "tarifas"; 
  async getAll(): Promise<Fee[]> {
    const { data, error } = await this.supabase
      .from(this.table)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener las tarifas:", error);
      return [];
    }
    return data || [];
  }
  
  
}