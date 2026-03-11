import { Establecimiento } from "./establecimiento.entity";

export interface EstablishmentsRepository {

  getAll(): Promise<Establecimiento[]>;

  create(establishment: Establecimiento): Promise<Establecimiento>;

  update(establecimiento: Establecimiento): Promise<Establecimiento>;

  findById(id: number): Promise<Establecimiento | null>;

  delete(id: number): Promise<void>;

}