// Importamos el repositorio
import { EstablishmentsRepository } from "../domain/establishments.repository";

// Caso de uso para obtener todos los establecimientos
export class ObtenerEstablecimientos {

  constructor(private repo: EstablishmentsRepository) {}

  // Devuelve todos los establecimientos
  ejecutar() {
    return this.repo.getAll();
  }
}