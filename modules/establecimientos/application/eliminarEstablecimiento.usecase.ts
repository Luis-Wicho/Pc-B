// Importamos repositorio
import { EstablecimientoRepository } from "../domain/establecimiento.repository";

// Caso de uso para eliminar un establecimiento
export class EliminarEstablecimiento {

  constructor(private repo: EstablecimientoRepository) {}

  // Ejecuta la eliminación
  ejecutar(id: number) {
    return this.repo.delete(id);
  }
}