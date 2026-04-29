"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { ArrowLeft } from 'lucide-react';

export default function EditEstablishmentView() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // Dentro de EditEstablishmentView
const [tamanios, setTamanios] = useState<any[]>([]);
const [tarifas, setTarifas] = useState<any[]>([]);
  
  // Inicializamos con los nombres reales de tu base de datos
  const [formData, setFormData] = useState<any>({
    num_expediente: "",
    nombre_establecimiento: "",
    nombre_propietario: "",
    direccion: "",
    estatus: "",
    giro_comercial: "",
    id_tamanio: "",
    id_tarifa: "",
    observaciones: ""
  });

  useEffect(() => {
  const cargarCatalogos = async () => {
    try {
      // Cargamos todo en paralelo para mayor velocidad
      const [resEst, resTam, resTar] = await Promise.all([
        fetch(`/api/Establishments/${id}`),
        fetch(`/api/tamanio`), // Ajusta estas rutas a tus APIs reales
        fetch(`/api/tarifas`)
      ]);

      if (resEst.ok) {
        const data = await resEst.json();
        // Limpieza de nulls que ya teníamos
        const cleanedData = Object.keys(data).reduce((acc: any, key) => {
          acc[key] = data[key] === null ? "" : data[key];
          return acc;
        }, {});
        setFormData(cleanedData);
      }

      if (resTam.ok) setTamanios(await resTam.json());
      if (resTar.ok) setTarifas(await resTar.json());

    } catch (error) {
      console.error("Error cargando catálogos:", error);
    } finally {
      setLoading(false);
    }
  };
  cargarCatalogos();
}, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await Swal.fire({
      title: '¿Guardar cambios?',
      text: "Se actualizará la información del establecimiento.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Revisar',
      customClass: { popup: 'rounded-3xl' }
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/Establishments/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await Swal.fire({
            title: "¡Actualizado!",
            text: "Los datos se guardaron correctamente.",
            icon: "success",
            confirmButtonColor: '#0f766e',
            customClass: { popup: 'rounded-3xl' }
          });
          router.push("/Establishments");
        } else {
          throw new Error("Error en la respuesta");
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el registro", "error");
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="no-print flex justify-start mb-4">
                    <button 
                        onClick={() => router.back()}
                        className="p-3 bg-white hover:bg-slate-100 text-slate-400 hover:text-teal-700 rounded-2xl transition-all border border-slate-200"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>
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
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-slate-100">
        <h2 className="text-4xl font-extrabold text-center text-slate-950 tracking-tight">
          Editar Establecimiento <span className="text-teal-600">{formData.num_expediente}</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Establecimiento *</label>
            <input
              type="text"
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition"
              value={formData.nombre_establecimiento}
              onChange={(e) => setFormData({...formData, nombre_establecimiento: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Nombre del Propietario</label>
            <input
              type="text"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
              value={formData.nombre_propietario}
              onChange={(e) => setFormData({...formData, nombre_propietario: e.target.value})}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Dirección Completa *</label>
            <input
              type="text"
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
            />
          </div>

          {/* Select de Estatus - Importante usar id_estatus si así está en tu DB */}
          <div>
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Estatus *</label>
            <select
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
              value={formData.estatus} 
              onChange={(e) => setFormData({...formData, estatus: e.target.value})}
            >
              <option value="">Seleccionar</option>
              <option value="1">Activo</option>
              <option value="2">Pendiente</option>
              <option value="3">Inactivo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Giro Comercial</label>
            <input
              type="text"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
              value={formData.giro_comercial}
              onChange={(e) => setFormData({...formData, giro_comercial: e.target.value})}
            />
          </div>

          {/* Tamaño y Tarifa (Se recomienda usar IDs para que coincida con tu lógica de getAll) */}
          {/* Selector de Tamaño */}
<div>
  <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Tamaño *</label>
  <select
    required
    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer"
    value={formData.id_tamanio}
    onChange={(e) => setFormData({...formData, id_tamanio: e.target.value})}
  >
    <option value="">Seleccionar tamaño</option>
    {tamanios.map((t) => (
      <option key={t.id_tamanio} value={t.id_tamanio}>
        {t.tamanio}
      </option>
    ))}
  </select>
</div>

{/* Selector de Tarifa */}
<div>
  <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Tarifa Anual *</label>
  <select
    required
    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer"
    value={formData.id_tarifa}
    onChange={(e) => setFormData({...formData, id_tarifa: e.target.value})}
  >
    <option value="">Seleccionar tarifa</option>
    {tarifas.map((tar) => (
      <option key={tar.id_tarifa} value={tar.id_tarifa}>
        ${tar.monto_base} {/* Ajusta 'monto_base' al nombre de tu columna */}
      </option>
    ))}
  </select>
</div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">Observaciones</label>
            <textarea
              rows={3}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none resize-none"
              value={formData.observaciones}
              onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
            />
          </div>

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-teal-700 text-white py-4 rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg shadow-teal-900/20 active:scale-[0.98]"
            >
              GUARDAR CAMBIOS
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition active:scale-[0.98]"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}