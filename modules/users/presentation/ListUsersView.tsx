"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

// Iconos para una interfaz más moderna
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;

type User = {
  id_usuario: number
  nombre_usuario: string
  nombre: string
  apellido_paterno: string
  apellido_maternno: string
  contrasena: string
}

export default function ListUsersView() {
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(true)

  const obtenerUsuarios = async () => {
    try {
      setCargando(true)
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json()
      if (!res.ok) {
        setMensaje(data.error || "Error al obtener usuarios")
        return
      }
      setUsuarios(data)
    } catch {
      setMensaje("No fue posible cargar usuarios")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim()
    if (!texto) return usuarios
    return usuarios.filter((u) => {
      const nombreCompleto = `${u.nombre} ${u.apellido_paterno} ${u.apellido_maternno}`.toLowerCase()
      return u.nombre_usuario.toLowerCase().includes(texto) || nombreCompleto.includes(texto)
    })
  }, [usuarios, busqueda])

  const eliminarUsuario = async (id: number) => {
    const confirmar = window.confirm("¿Deseas eliminar este usuario?")
    if (!confirmar) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setMensaje(data.error || "Error al eliminar usuario")
        return
      }
      setMensaje("Usuario eliminado correctamente")
      obtenerUsuarios()
    } catch {
      setMensaje("No fue posible eliminar el usuario")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-lato">
      <div className="mx-auto max-w-6xl">
        
        {/* Encabezado Estilizado */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Usuarios Existentes </h1>
            <p className="text-slate-500 font-medium">Gestión de accesos y usuarios de PC&B</p>
          </div>

          <Link
            href="/users/New"
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-white font-bold hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20 active:scale-95"
          >
            <PlusIcon />
            Nuevo Usuario
          </Link>
        </div>

        {/* Barra de Búsqueda y Mensajes */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Buscar por nombre o usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 pl-12 text-slate-700 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
        </div>

        {mensaje && (
          <div className={`mb-6 rounded-xl p-4 font-semibold flex justify-between items-center ${mensaje.includes('Error') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-teal-50 text-teal-700 border border-teal-100'}`}>
            <span>{mensaje}</span>
            <button onClick={() => setMensaje("")} className="text-current opacity-50 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Tabla / Contenido */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
          {cargando ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700"></div>
              <p className="text-slate-500 font-medium font-lato">Sincronizando con la base de datos...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-widest font-bold">
                    <th className="px-6 py-5">ID</th>
                    <th className="px-6 py-5">Usuario</th>
                    <th className="px-6 py-5">Nombre Completo</th>
                    <th className="px-6 py-5 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {usuariosFiltrados.map((u) => (
                    <tr key={u.id_usuario} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5 font-mono text-sm text-slate-400">#{u.id_usuario}</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center rounded-lg bg-teal-50 px-2.5 py-1 text-sm font-bold text-teal-700 border border-teal-100">
                          @{u.nombre_usuario}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-700">
                        {u.nombre} {u.apellido_paterno} {u.apellido_maternno}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/usuarios/${u.id_usuario}/editar`}
                            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                            title="Editar usuario"
                          >
                            <EditIcon />
                          </Link>
                          <button
                            onClick={() => eliminarUsuario(u.id_usuario)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Eliminar usuario"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {usuariosFiltrados.length === 0 && (
                <div className="py-20 text-center text-slate-400">
                  <p className="text-lg">No se encontraron usuarios registrados.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}