"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegistrarEstablecimientoView() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // --- ESTADOS ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tamanio, setTamanio] = useState<any[]>([]);
  const [tarifas, setTarifas] = useState<any[]>([]);
  
  // Estado para la ventana flotante (Modal de Notificación)
  const [notificacion, setNotificacion] = useState<{
    mostrar: boolean;
    tipo: 'exito' | 'error';
    mensaje: string;
  }>({ mostrar: false, tipo: 'exito', mensaje: '' });

  const [form, setForm] = useState({
    no_expediente: "",
    nombre_establecimiento: "",
    nombre_propietario: "",
    direccion: "",
    giro_comercial: "",
    estatus: "",
    id_tamanio: undefined as number | undefined,
    observaciones: "",
    id_tarifa: undefined as number | undefined,
  });

  // --- CARGA DE DATOS ---
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resTamanio, resTarifas] = await Promise.all([
          fetch("/api/tamanio"),
          fetch("/api/tarifas")
        ]);
        
        const dataTamanio = await resTamanio.json();
        const dataTarifas = await resTarifas.json();

        setTamanio(Array.isArray(dataTamanio) ? dataTamanio : []);
        setTarifas(Array.isArray(dataTarifas) ? dataTarifas : []);
      } catch (error) {
        console.error("Error cargando selects", error);
      } finally {
      setLoading(false);
    }
    };
    cargarDatos();
  }, []);

  // --- MANEJADORES ---
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "id_tamanio" || name === "id_tarifa"
        ? value === "" ? undefined : Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.no_expediente.trim() || !form.nombre_establecimiento.trim() || !form.id_tamanio || !form.id_tarifa) {
      setNotificacion({
        mostrar: true,
        tipo: 'error',
        mensaje: 'Por favor completa todos los campos marcados con asterisco (*).'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = { ...form };

      // Limpieza de campos vacíos
      Object.keys(dataToSend).forEach((key) => {
        const k = key as keyof typeof dataToSend;
        if (dataToSend[k] === "" || dataToSend[k] === undefined || dataToSend[k] === null) {
          delete dataToSend[k];
        }
      });

      const res = await fetch("/api/Establishments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Error al procesar el registro");
      }

      // Éxito: Mostrar modal premium
      setNotificacion({
        mostrar: true,
        tipo: 'exito',
        mensaje: 'El establecimiento ha sido registrado correctamente en el sistema.'
      });

    } catch (error: any) {
      setNotificacion({
        mostrar: true,
        tipo: 'error',
        mensaje: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-lato">
      
      {/* Cabecera Principal */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col items-center border-b border-slate-100 pb-10">
        <div className="p-2 mb-4">
          <Image
            src="/img/Pcblogo.png"
            alt="Logo Protección Civil"
            width={120}
            height={120}
            priority
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-teal-700 tracking-tight leading-tight">PROTECCIÓN CIVIL</p>
          <p className="text-2xl font-semibold text-orange-600 leading-tight">Y BOMBEROS</p>
          <p className="text-lg font-normal text-slate-900 pt-1">IZÚCAR DE MATAMOROS, PUE.</p>
        </div>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="mb-10 pb-6 border-b border-slate-100">
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Registro de Nuevo Establecimiento</h1>
          <p className="text-slate-500 text-lg mt-1">Formulario de Alta para Protección Civil</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">No. de Expediente *</label>
            <input
              type="text"
              name="no_expediente"
              value={form.no_expediente}
              onChange={handleChange}
              placeholder="Ej: EXP-2026-001"
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 shadow-sm transition-all outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Nombre del Establecimiento *</label>
            <input
              type="text"
              name="nombre_establecimiento"
              value={form.nombre_establecimiento}
              onChange={handleChange}
              placeholder="Nombre comercial"
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 shadow-sm transition-all outline-none"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <span className="text-xs font-black text-teal-700 uppercase tracking-widest ml-1">Datos del Propietario</span>
            <input
              type="text"
              name="nombre_propietario"
              value={form.nombre_propietario}
              onChange={handleChange}
              placeholder="Nombre completo del titular"
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2 flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Dirección Completa *</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Calle, número, colonia..."
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Estatus *</label>
            <select
              name="estatus"
              value={form.estatus}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 outline-none transition-all"
            >
              <option value="">Seleccionar...</option>
              <option value="Activo">Activo</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Giro Comercial</label>
            <input
              type="text"
              name="giro_comercial"
              value={form.giro_comercial}
              onChange={handleChange}
              placeholder="Ej: Restaurante"
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Tamaño</label>
            <select
              name="id_tamanio"
              value={form.id_tamanio}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 outline-none transition-all"
            >
              <option value="">Seleccionar...</option>
              {tamanio.map((t) => (
                <option key={t.id_tamanio} value={t.id_tamanio}>{t.tamanio}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Tarifa Anual</label>
            <select
              name="id_tarifa"
              value={form.id_tarifa}
              onChange={handleChange}
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 outline-none transition-all"
            >
              <option value="">Seleccionar...</option>
              {tarifas.map((t) => (
                <option key={t.id_tarifa} value={t.id_tarifa}>{`$${t.monto_base}`}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col space-y-2">
            <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Observaciones</label>
            <textarea
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 outline-none transition-all"
              placeholder="Notas adicionales relevantes..."
            />
          </div>

          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 text-white font-black rounded-2xl transition-all duration-300 shadow-lg active:scale-95 text-xl flex items-center justify-center gap-3 ${
                isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800 shadow-teal-700/20"
              }`}
            >
              {isSubmitting ? "PROCESANDO..." : "GUARDAR REGISTRO"}
            </button>
          </div>
        </form>
      </div>

      {/* --- VENTANA FLOTANTE DE NOTIFICACIÓN (MODAL PREMIUM) --- */}
      {notificacion.mostrar && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-all duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
            
            {/* Cabecera con Gradiente */}
            <div className={`p-10 text-white text-center ${
              notificacion.tipo === 'exito' ? 'bg-gradient-to-br from-teal-700 to-teal-900' : 'bg-gradient-to-br from-orange-600 to-red-700'
            }`}>
              <div className="bg-white/20 w-20 h-20 rounded-[2rem] backdrop-blur-md mx-auto mb-4 flex items-center justify-center">
                {notificacion.tipo === 'exito' ? (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                )}
              </div>
              <h2 className="text-3xl font-black tracking-tighter">
                {notificacion.tipo === 'exito' ? '¡LISTO!' : '¡ERROR!'}
              </h2>
            </div>

            {/* Mensaje y Botón */}
            <div className="p-10 text-center space-y-8">
              <p className="text-slate-600 font-bold text-lg leading-snug">
                {notificacion.mensaje}
              </p>

              <button 
                onClick={() => {
                  if (notificacion.tipo === 'exito') {
                    router.push("/Establishments");
                  } else {
                    setNotificacion({ ...notificacion, mostrar: false });
                  }
                }}
                className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 ${
                  notificacion.tipo === 'exito' ? 'bg-teal-700 hover:bg-teal-800' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {notificacion.tipo === 'exito' ? 'CONTINUAR' : 'REINTENTAR'}
              </button>
            </div>
            
            <div className={`h-2 w-full ${notificacion.tipo === 'exito' ? 'bg-teal-700' : 'bg-orange-600'} opacity-30`}></div>
          </div>
        </div>
      )}
    </div>
  );
}