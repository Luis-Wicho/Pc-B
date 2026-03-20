import { Fee } from "./fee.entity";

export interface FeesRepository {
  // REQ13: Registro
  create(fee: Fee): Promise<Fee | null>;
  
  // REQ15: Visualización
  getAll(): Promise<Fee[]>;
  getById(id: number): Promise<Fee | null>;
  
  // REQ14: Modificación
  update(id: number, fee: Partial<Fee>): Promise<Fee | null>;
  
  // REQ16: Baja
  delete(id: number): Promise<boolean>;
}