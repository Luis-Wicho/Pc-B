// Importamos repositorio
import { EstablishmentsRepository } from "../domain/establishments.repository";

// Caso de uso para eliminar un establecimiento
export class EliminarEstablecimiento {

  constructor(private repo: EstablishmentsRepository) {}

  // Ejecuta la eliminación
  ejecutar(id: number) {
    return this.repo.delete(id);
  }
}