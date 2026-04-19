"use client";

import Swal from 'sweetalert2';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export default function ListoEstablishmentsView() {
  const router = useRouter();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const obtenerEstablecimientos = async () => {
    try {
      const res = await fetch("/api/Establishments");

      // Verificamos si la respuesta HTTP es exitosa (status 200-299)
      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }

      const data = await res.json();

      // Verificamos si la API mandó un error controlado
      if (data.error) {
        throw new Error(data.error);
      }

      setEstablecimientos(data);

    } catch (error){
      console.error("Error al obtener establecimientos:", error);   
    }finally {
      setLoading(false);
    }
  };

  obtenerEstablecimientos();
}, []);

  const manejarEliminar = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: { popup: 'rounded-3xl' }
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/Establishments/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setEstablecimientos(prev => prev.filter(e => e.id_establecimiento !== id));
          Swal.fire({
            title: '¡Eliminado!',
            icon: 'success',
            confirmButtonColor: '#0f766e',
            timer: 2000
          });
        }
      } catch (err) {
        Swal.fire('Error', 'Fallo de conexión', 'error');
      }
    }
  };

  // --- LÓGICA DE FILTRADO UNIFICADA ---
  const establecimientosFiltrados = establecimientos.filter((e: any) => {
    const termino = busqueda.toLowerCase();
    return (
      e.nombre_establecimiento?.toLowerCase().includes(termino) ||
      e.no_expediente?.toLowerCase().includes(termino) ||
      e.nombre_propietario?.toLowerCase().includes(termino)
    );
  });

  // --- LÓGICA DE PAGINACIÓN ---
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  const ultimoIndice = paginaActual * registrosPorPagina;
  const primerIndice = ultimoIndice - registrosPorPagina;
  const registrosVisualizados = establecimientosFiltrados.slice(primerIndice, ultimoIndice);
  const totalPaginas = Math.ceil(establecimientosFiltrados.length / registrosPorPagina);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-lato">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/img/Pcblogo.png" alt="Logo" width={120} height={80} />
          <h1 className="text-3xl font-bold text-teal-700 mt-3">Lista de Establecimientos</h1>
        </div>

        {/* BUSCADOR + BOTÓN */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <input 
            type="text"
            placeholder="Buscar por expediente, nombre o propietario..."
            className="w-full max-w-md px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            onClick={() => router.push("/Establishments/register")}
            className="px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition shadow-md active:scale-95"
          >
            + Registrar
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-3 text-left">Expediente</th>
                <th className="p-3 text-left">Establecimiento</th>
                <th className="p-3 text-left">Propietario</th>
                <th className="p-3 text-left">Dirección</th>
                <th className="p-3 text-left">Estatus</th>
                <th className="p-3 text-left">Giro</th>
                <th className="p-3 text-left">Tamaño</th>
                <th className="p-3 text-left">Tarifa</th>
                <th className="p-3 text-left text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registrosVisualizados.map((e: any) => (
                <tr key={e.id_establecimiento} className="border-b hover:bg-slate-50 transition">
                  <td className="p-3 font-medium text-slate-700">{e.no_expediente}</td>
                  <td className="p-3 text-slate-600">{e.nombre_establecimiento}</td>
                  <td className="p-3 text-slate-600">{e.nombre_propietario}</td>
                  <td className="p-3 text-slate-600 max-w-[200px] truncate">{e.direccion}</td>
                  <td className="p-3">
                    {(() => {
                      // Definimos qué significa cada número
                      const nombresEstatus: { [key: string]: string } = {
                        "1": "Activo",
                        "2": "Pendiente",
                        "3": "Inactivo"
                      };

                      // Obtenemos el texto basado en el valor que viene de la DB
                      const textoEstatus = nombresEstatus[e.estatus] || e.estatus;

                      return (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            textoEstatus === "Activo" ? "bg-green-100 text-green-700" :
                            textoEstatus === "Pendiente" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                        }`}>
                          {textoEstatus}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="p-3 text-slate-600">{e.giro_comercial}</td>
                  <td className="p-3 text-slate-600">{e.nombre_tamanio}</td>
                  <td className="p-3 text-slate-600 font-bold">${e.monto_tarifa?.toFixed(2) || "0.00"}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => router.push(`/Establishments/edit/${e.id_establecimiento}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => manejarEliminar(e.id_establecimiento)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN */}
        {totalPaginas > 1 && (
          <div className="flex justify-center mt-6 gap-2 text-sm">
            <button 
              onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-3 py-1 rounded-lg hover:bg-slate-200 disabled:opacity-30"
            > « </button>
            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPaginaActual(i + 1)}
                className={`px-3 py-1 rounded-lg transition ${
                  paginaActual === i + 1 ? "bg-teal-700 text-white" : "hover:bg-slate-200"
                }`}
              > {i + 1} </button>
            ))}
            <button 
              onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1 rounded-lg hover:bg-slate-200 disabled:opacity-30"
            > » </button>
          </div>
        )}
      </div>
    </div>
  );
}