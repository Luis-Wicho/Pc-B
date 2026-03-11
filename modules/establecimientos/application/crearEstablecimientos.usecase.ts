// Importamos el repositorio
import { Establishment } from "../domain/establishment.entity";
import { EstablishmentsRepository } from "../domain/establishments.repository";

// Importamos la entidad

// Caso de uso para crear un establecimiento
export class CreateEstablishmentUseCase {

  constructor(private repo: EstablishmentsRepository) {}

  // Ejecuta la creación del establecimiento
  ejecutar(establecimiento: Establishment) {
    return this.repo.create(establecimiento);
  }
}