// Importamos la entidad Establecimiento que define la estructura de los datos
import { Establecimiento } from "./establecimiento.entity";

// Definimos la interfaz del repositorio.
// Esta interfaz funciona como un contrato que indica qué operaciones
// se pueden realizar con los establecimientos.
export interface EstablecimientoRepository {
  delete(id: number): unknown;

  // Método para obtener todos los establecimientos registrados.
  // Devuelve una promesa que contiene un arreglo de establecimientos.
  getAll(): Promise<Establecimiento[]>;

  // Método para crear un nuevo establecimiento.
  // Recibe un objeto de tipo Establecimiento y devuelve
  // una promesa con el establecimiento creado.
  create(establecimiento: Establecimiento): Promise<Establecimiento>;

  // Método para actualizar un establecimiento existente.
  // Recibe el establecimiento con los datos actualizados
  // y devuelve una promesa con el establecimiento actualizado.
  update(establecimiento: Establecimiento): Promise<Establecimiento>;

  // Método para buscar un establecimiento por su ID.
  // Recibe el id del establecimiento y devuelve:
  // - el establecimiento si existe
  // - null si no se encuentra en la base de datos.
  findById(id: number): Promise<Establecimiento | null>;
}