// Importamos el repositorio
import { EstablecimientoRepository } from "../domain/establecimiento.repository";

// Caso de uso para obtener todos los establecimientos
export class ObtenerEstablecimientos {

  constructor(private repo: EstablecimientoRepository) {}

  // Devuelve todos los establecimientos
  ejecutar() {
    return this.repo.getAll();
  }
}