"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

// Iconos SVG minimalistas
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>;

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

  const [mostrarModal, setMostrarModal] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null)

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

  const abrirModal = (usuario: User) => {
    setUsuarioEditando({ ...usuario })
    setMostrarModal(true)
  }

  const guardarCambios = async () => {
    if (!usuarioEditando) return
    try {
      const res = await fetch(`/api/users/${usuarioEditando.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEditando),
      })
      if (res.ok) {
        setMostrarModal(false)
        obtenerUsuarios()
      }
    } catch {
      alert("Error al guardar cambios")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-lato">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Usuarios del Sistema</h1>
            <p className="text-slate-500 text-lg mt-1">Gestión de personal de Protección Civil</p>
          </div>
          <Link href="/users/New" className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 transition px-8 py-4 text-white rounded-2xl shadow-lg shadow-teal-700/20 font-bold text-lg">
            <PlusIcon /> Nuevo Usuario
          </Link>
        </div>

        {/* Buscador */}
        <div className="relative mb-8 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar por usuario o nombre completo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-teal-200 focus:border-teal-700 outline-none transition-all text-slate-700"
          />
        </div>

        {/* Tabla Estilizada */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Usuario</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre Completo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cargando ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">Cargando usuarios...</td></tr>
              ) : usuariosFiltrados.map((u) => (
                <tr key={u.id_usuario} className="hover:bg-teal-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">{u.nombre_usuario}</span>
                  </td>
                  <td className="px-6 py-5 text-slate-700 font-medium">
                    {u.nombre} {u.apellido_paterno} {u.apellido_maternno}
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button 
                      onClick={() => abrirModal(u)}
                      className="p-2 text-slate-400 hover:text-teal-700 hover:bg-teal-100 rounded-xl transition-all"
                      title="Editar"
                    >
                      <EditIcon />
                    </button>
                    <button 
                      onClick={() => eliminarUsuario(u.id_usuario)}
                      className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                      title="Eliminar"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VENTANA FLOTANTE (MODAL) MEJORADA */}
{mostrarModal && usuarioEditando && (
  <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
    
    <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-md overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
      
      {/* Encabezado con Gradiente Corporativo */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-8 text-white relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Editar Usuario</h2>
            <p className="text-teal-50/80 text-sm font-medium">Actualice las credenciales del sistema</p>
          </div>
        </div>
      </div>
      
      {/* Cuerpo del Formulario */}
      <div className="p-8 space-y-6">
        
        {/* Campo Usuario */}
        <div className="space-y-2 group">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              Usuario
          </label>
          <div className="relative">
            <input
              value={usuarioEditando.nombre_usuario}
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombre_usuario: e.target.value })}
              className="w-full pl-4 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 focus:bg-white outline-none transition-all duration-200 font-bold text-slate-800"
              placeholder="Ej: admin_izucar"
            />
          </div>
        </div>

        {/* Campo Nombre Completo */}
        <div className="space-y-2 group">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
            Nombre Completo
          </label>
          <input
            value={usuarioEditando.nombre}
            onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 focus:bg-white outline-none transition-all duration-200 text-slate-700 font-medium"
            placeholder="Nombre y apellidos"
          />
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => setMostrarModal(false)}
            className="flex-1 px-4 py-4 text-slate-500 font-extrabold hover:bg-slate-100 rounded-2xl transition-colors duration-200 active:scale-95"
          >
            Cancelar
          </button>
          
          <button 
            onClick={guardarCambios} 
            className="flex-[1.5] bg-orange-600 hover:bg-orange-700 text-white px-4 py-4 rounded-2xl font-black shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_15px_25px_rgba(234,88,12,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Guardar Cambios
          </button>
        </div>
      </div>
      
      {/* Detalle decorativo inferior */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-700 via-orange-500 to-teal-800 opacity-20"></div>
    </div>
  </div>
)}
</div>
</div>
)}
      