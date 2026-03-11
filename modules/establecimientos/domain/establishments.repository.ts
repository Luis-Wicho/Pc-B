import { Establishment } from "./establishment.entity";

export interface EstablishmentsRepository {

  getAll(): Promise<Establishment[]>;

  create(establishment: Establishment): Promise<Establishment>;

  update(establecimiento: Establishment): Promise<Establishment>;

  findById(id: number): Promise<Establishment | null>;

  delete(id: number): Promise<void>;

}