"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { ArrowLeft } from 'lucide-react';

export default function EditUserView() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    usuario: "",
    nombre_completo: ""
  });

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);

        if (res.ok) {
          const data = await res.json();

          const cleanedData = Object.keys(data).reduce((acc: any, key) => {
            acc[key] = data[key] === null ? "" : data[key];
            return acc;
          }, {});

          setFormData(cleanedData);
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: '¿Guardar cambios?',
      text: "Se actualizará la información del usuario.",
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
        const response = await fetch(`/api/users/${id}`, {
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

          router.push("/users");
        } else {
          throw new Error("Error en la respuesta");
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el usuario", "error");
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

      {/* Cabecera con logo (igual que establecimientos) */}
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
          <p className="text-3xl font-bold text-teal-700 tracking-tight">PROTECCIÓN CIVIL</p>
          <p className="text-2xl font-semibold text-orange-600">Y BOMBEROS</p>
          <p className="text-lg text-slate-900">IZÚCAR DE MATAMOROS, PUE.</p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-slate-100">
        <h2 className="text-4xl font-extrabold text-center text-slate-950">
          Editar Usuario <span className="text-teal-600">{formData.usuario}</span>
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-6">

          {/* Usuario */}
          <div>
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">
              Usuario *
            </label>
            <input
              type="text"
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
            />
          </div>

          {/* Nombre completo */}
          <div>
            <label className="block text-xs font-bold text-teal-700 uppercase mb-2 ml-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
              value={formData.nombre_completo}
              onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-teal-700 text-white py-4 rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg shadow-teal-900/20 active:scale-[0.98]"
            >
              GUARDAR CAMBIOS
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition"
            >
              CANCELAR
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}