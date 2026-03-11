// Importamos repositorio
import { Establishment } from "../domain/establishment.entity";
import { EstablishmentsRepository } from "../domain/establishments.repository";

// Importamos entidad

// Caso de uso para actualizar un establecimiento
export class ActualizarEstablecimiento {

  constructor(private repo: EstablishmentsRepository) {}

  // Ejecuta la actualización
  ejecutar(establecimiento: Establishment) {
    return this.repo.update(establecimiento);
  }
}