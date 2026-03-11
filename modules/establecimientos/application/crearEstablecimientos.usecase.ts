// Importamos el repositorio
import { EstablishmentsRepository } from "../domain/establishments.repository";

// Importamos la entidad
import { Establecimiento } from "../domain/establecimiento.entity";

// Caso de uso para crear un establecimiento
export class CreateEstablishmentUseCase {

  constructor(private repo: EstablishmentsRepository) {}

  // Ejecuta la creación del establecimiento
  ejecutar(establecimiento: Establecimiento) {
    return this.repo.create(establecimiento);
  }
}