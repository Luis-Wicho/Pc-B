// Importamos repositorio
import { EstablishmentsRepository } from "../domain/establishments.repository";

// Importamos entidad
import { Establecimiento } from "../domain/establecimiento.entity";

// Caso de uso para actualizar un establecimiento
export class ActualizarEstablecimiento {

  constructor(private repo: EstablishmentsRepository) {}

  // Ejecuta la actualización
  ejecutar(establecimiento: Establecimiento) {
    return this.repo.update(establecimiento);
  }
}