"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListaUsuarios() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  // Obtener usuarios
  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();

      // Agregar propiedad seleccionado
      const usuariosConSeleccion = data.map((u: any) => ({
        ...u,
        seleccionado: false,
      }));

      setUsuarios(usuariosConSeleccion);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Seleccionar usuario
  const toggleSeleccion = (index: number) => {
    const nuevos = [...usuarios];
    nuevos[index].seleccionado = !nuevos[index].seleccionado;
    setUsuarios(nuevos);
  };

  // Filtrar usuarios
  const filtrados = usuarios.filter((u) =>
    u.username.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-500 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Protección Civil
      </h1>

      {/* Buscador */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold">Registros</span>

        <div className="flex items-center gap-2">
          <span>Buscar Registro</span>
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border-2 border-black p-2 bg-white"
          />
        </div>
      </div>

      {/* Loading */}
      {cargando && <p className="text-center">Cargando...</p>}

      {/* Lista */}
      <div className="flex flex-col gap-6">
        {filtrados.map((user, index) => (
          <div
            key={index}
            className="bg-gray-200 border-2 border-black p-4 flex justify-between items-center"
=======
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type User = {
  id_usuario: number;
  nombre_usuario: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string; // 👈 corregido nombre
  contrasena: string;
};

export default function ListUsersView() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  // 🔥 Obtener usuarios
  const obtenerUsuarios = async () => {
    try {
      setCargando(true);

      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "Error al obtener usuarios");
        return;
      }

      setUsuarios(data);
    } catch {
      setMensaje("No fue posible cargar usuarios");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // 🔎 Filtro
  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return usuarios;

    return usuarios.filter((u) => {
      const nombreCompleto =
        `${u.nombre} ${u.apellido_paterno} ${u.apellido_materno}`.toLowerCase();

      return (
        u.nombre_usuario.toLowerCase().includes(texto) ||
        nombreCompleto.includes(texto)
      );
    });
  }, [usuarios, busqueda]);

  // 🗑️ Eliminar
  const eliminarUsuario = async (id: number) => {
    const confirmar = window.confirm("¿Deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "Error al eliminar usuario");
        return;
      }

      setMensaje(data.message);
      obtenerUsuarios();
    } catch {
      setMensaje("No fue posible eliminar el usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-md">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>

          <Link
            href="/usuarios/nuevo"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>>>>>>> a12e43c02dc034055883c2914e076b05b5fd95b3
          >
            Nuevo usuario
          </Link>
        </div>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3"
        />

        {/* Mensaje */}
        {mensaje && (
          <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-green-700">
            {mensaje}
          </div>
        )}

        {/* Tabla */}
        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No hay usuarios
                    </td>
                  </tr>
                ) : (
                  usuariosFiltrados.map((u) => (
                    <tr key={u.id_usuario} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{u.id_usuario}</td>

                      <td className="px-4 py-3">
                        {u.nombre_usuario}
                      </td>

                      <td className="px-4 py-3">
                        {u.nombre} {u.apellido_paterno} {u.apellido_materno}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          
                          <Link
                            href={`/usuarios/${u.id_usuario}`}
                            className="rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-700"
                          >
                            Ver
                          </Link>

                          <Link
                            href={`/usuarios/${u.id_usuario}/editar`}
                            className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                          >
                            Editar
                          </Link>

                          <button
                            onClick={() => eliminarUsuario(u.id_usuario)}
                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                          >
                            Eliminar
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}