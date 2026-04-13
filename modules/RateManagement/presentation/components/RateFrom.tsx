"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Iconos SVG profesionales y minimalistas para los botones de acción
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
const DollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>;

export default function RateFrom() {
  const router = useRouter();
  //const supabase = createClientComponentClient();

  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  // Obtener datos dinámicamente de Supabase
  const obtenerRegistros = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("establecimientos_tarifas") // Asegúrate de que tu tabla se llame así
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Agregamos el campo seleccionado para el manejo de los checkboxes
      const registrosConSeleccion = data.map((r) => ({
        ...r,
        seleccionado: false,
      }));

      setRegistros(registrosConSeleccion);
    } catch (error) {
      console.error("Error al obtener registros de Supabase:", error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  const toggleSeleccion = (id) => {
    setRegistros(registros.map(r => 
      r.id === id ? { ...r, seleccionado: !r.seleccionado } : r
    ));
  };

  const filtrados = registros.filter((r) =>
    r.nombre_establecimiento?.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.numero_expediente?.toString().includes(busqueda)
  );

  return (
    // 1. Fondo general: Cambiado a bg-slate-50 (Gris muy claro #F5F5F5) para limpieza
    <div className="min-h-screen bg-slate-50 p-8 font-lato">
      
      {/* 2. Cabecera Principal Integrando la Identidad de Marca */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col items-center">
        
        {/* Sección del Logo Corporativo: Mantenemos tu imagen */}
        <div className="p-2 mb-4">
          <Image
            src="/img/Pcblogo.png" // Asegúrate de que esta ruta sea correcta
            alt="Logo Protección Civil y Bomberos Izúcar"
            width={160} // Ligeramente más pequeño para mejor balance
            height={160}
            priority
            className="object-contain" // Asegura que el logo no se deforme
          />
        </div>

        {/* Sección de Identidad de Marca: Estilizado con los colores corporativos */}
        <div className="text-center space-y-1">
          {/* 'PROTECCIÓN CIVIL' en Teal Primario #1E838F */}
          <p className="text-3xl font-bold text-teal-700 tracking-tight leading-tight">
            PROTECCIÓN CIVIL
          </p>
          {/* 'Y BOMBEROS' en Naranja de Acento #E8702D */}
          <p className="text-2xl font-semibold text-orange-600 leading-tight">
            Y BOMBEROS
          </p>
          {/* Ubicación en Gris Oscuro #1D1D1B */}
          <p className="text-lg font-normal text-slate-900 pt-1">
            IZÚCAR DE MATAMOROS, PUE.
          </p>
        </div>
      </div>

      {/* 3. Panel de Búsqueda y Título de la Sección */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Gestión de Tarifas</h1>
            <p className="text-slate-500 text-lg mt-1">Registros de Establecimientos Activos</p>
          </div>

          {/* Buscador Estilizado */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar por establecimiento o expediente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              // Inputs: Estilizados con bordes sutiles y focus Teal
              className="pl-10 pr-4 py-3 w-full md:w-80 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-700 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* 4. Lista de Registros (Tabla/Tarjetas) */}
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Cabecera de la lista para simular tabla profesional */}
        <div className="flex items-center justify-between px-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <div className="grid grid-cols-3 gap-4 w-full">
            <span>Establecimiento</span>
            <span>No. Expediente</span>
            <span>Tarifa Aplicada</span>
          </div>
          <span>Seleccionar</span>
        </div>

        {cargando ? (
          <div className="text-center py-20 gap-4 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto"></div>
            <p className="mt-4 text-slate-500">Cargando registros de Supabase...</p>
          </div>
        ) : filtrados.length > 0 ? (
          filtrados.map((registro) => (
            <div
              key={registro.id}
              // Tarjeta Principal: Fondo blanco limpio con bordes redondeados y sombra suave
              className={`group bg-white p-6 rounded-2xl shadow-sm border-2 transition-all duration-300 flex justify-between items-center hover:shadow-md ${
                registro.seleccionado ? "border-teal-600 bg-teal-50/30" : "border-slate-100"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-teal-700 uppercase">Establecimiento</span>
                  <p className="text-lg font-semibold text-slate-900">{registro.nombre_establecimiento}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase">No. Expediente</span>
                  <p className="text-lg text-slate-700">{registro.numero_expediente}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase">Tarifa</span>
                  <p className="text-lg text-slate-700">
                    {registro.tarifa ? `$${registro.tarifa.toFixed(2)}` : "-"}
                  </p>
                </div>
              </div>

              {/* Checkbox Estilizado con Naranja de acento */}
              <div
                onClick={() => toggleSeleccion(registro.id)}
                className={`ml-8 w-8 h-8 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                  registro.seleccionado 
                  ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200 scale-110" 
                  : "bg-white border-slate-200 text-transparent hover:border-teal-500"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">No se encontraron establecimientos con ese nombre o expediente.</p>
          </div>
        )}
      </div>

      {/* 5. Barra de Acciones Flotante: Sustituye a los botones sueltos de abajo */}
      <div className="max-w-7xl mx-auto mt-12 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-3">
          {/* Botón Principal (bg-teal-700) */}
          <button className="px-6 py-3 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition shadow-lg shadow-teal-700/20 active:scale-95 text-lg flex items-center gap-2">
            <PlusIcon /> Agregar Nuevo
          </button>
          
          <button className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 transition flex items-center gap-2 text-lg">
            <TrashIcon /> Eliminar
          </button>
        </div>

        <div className="flex gap-3">
          {/* Botón de Orden de Pago (bg-slate-800) */}
          <button className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-black transition flex items-center gap-2 text-lg">
            <DollarIcon /> Generar Orden de Pago
          </button>
          
          <button className="px-6 py-3 bg-slate-100 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition flex items-center gap-2 text-lg border border-teal-200/50">
            <EditIcon /> Editar Registro
          </button>
        </div>
      </div>
    </div>
  );
}