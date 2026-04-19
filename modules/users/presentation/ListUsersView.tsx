"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

// Iconos
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>;

type User = {
  id_usuario: number
  nombre_usuario: string
  nombre: string
  apellido_paterno: string
  apellido_maternno: string
}

export default function ListUsersView() {
  const router = useRouter()

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
      if (res.ok) {
        setMensaje("Usuario eliminado")
        obtenerUsuarios()
      }
    } catch {
      setMensaje("Error al eliminar")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-lato">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Usuarios del Sistema</h1>
            <p className="text-slate-500 text-lg mt-1">Gestión de personal</p>
          </div>

          <Link href="/users/New" className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 px-8 py-4 text-white rounded-2xl font-bold">
            <PlusIcon /> Nuevo Usuario
          </Link>
        </div>

        {/* Buscador */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200"
          />
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-left">Usuario</th>
                <th className="px-6 py-4 text-left">Nombre</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={3} className="text-center py-10">Cargando...</td>
                </tr>
              ) : usuariosFiltrados.map((u) => (
                <tr key={u.id_usuario}>
                  <td className="px-6 py-4">{u.nombre_usuario}</td>
                  <td className="px-6 py-4">
                    {u.nombre} {u.apellido_paterno} {u.apellido_maternno}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    
                    {/* ✅ BOTÓN EDITAR CORRECTO */}
                    <button 
                      onClick={() => router.push(`/users/EdidUsert/${u.id_usuario}`)}
                      className="p-2 text-slate-400 hover:text-teal-700 hover:bg-teal-100 rounded-xl"
                      title="Editar"
                    >
                      <EditIcon />
                    </button>

                    <button 
                      onClick={() => eliminarUsuario(u.id_usuario)}
                      className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl"
                    >
                      <TrashIcon />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}