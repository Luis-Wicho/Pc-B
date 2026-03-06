import { Usuarios } from "./usuarios.entity";

export interface UsuarioRepository {

  // Obtener la lista de todos los usuarios
  getAll(): Promise<Usuarios[]>;

  // Registrar un nuevo usuario (Create)
  create(usuario: Usuarios): Promise<Usuarios>;

  // Actualizar datos de un usuario existente (Update)
  update(usuario: Usuarios): Promise<Usuarios>;

  // Buscar un usuario por su ID (Read)
  findById(id: number): Promise<Usuarios | null>;

  // Opcional: Buscar por nombre de usuario (útil para el Login)
  findByUsername(nombre_usuario: string): Promise<Usuarios | null>;
}