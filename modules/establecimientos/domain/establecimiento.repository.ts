import { Establecimiento } from "./establecimiento.entity";

export interface EstablecimientoRepository {

  getAll(): Promise<Establecimiento[]>;

  create(establecimiento: Establecimiento): Promise<Establecimiento>;

  update(establecimiento: Establecimiento): Promise<Establecimiento>;

  findById(id: number): Promise<Establecimiento | null>;

  delete(id: number): Promise<void>;

}