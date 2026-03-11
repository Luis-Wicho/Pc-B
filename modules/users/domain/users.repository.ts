import { Usuarios as users } from "./users.entity";

export interface UsuarioRepository {

  // Obtener la lista de todos los usuarios
  getAll(): Promise<users[]>;

  // Registrar un nuevo usuario (Create)
  create(usuario: users): Promise<users>;

  // Actualizar datos de un usuario existente (Update)
  update(usuario: users): Promise<users>;

  // Buscar un usuario por su ID (Read)
  findById(id: number): Promise<users | null>;

  // Opcional: Buscar por nombre de usuario (útil para el Login)
  findByUsername(nombre_usuario: string): Promise<users | null>;
}