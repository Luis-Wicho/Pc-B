"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, AlertCircle } from "lucide-react";
import Swal from 'sweetalert2';

// Definimos la forma de los datos para que TypeScript no marque error
interface TarifasData {
  bajo: number;
  medio: number;
  alto: number;
}

export default function GestionCostosTarifas() {
  const [tarifas, setTarifas] = useState<TarifasData>({
    bajo: 0,
    medio: 0,
    alto: 0
  });
  const [cargando, setCargando] = useState(true);

  // 1. Cargar los montos reales de la tabla al abrir la pantalla
  useEffect(() => {
    const obtenerCostosBaseDeDatos = async () => {
      try {
        const res = await fetch('/api/ratess');
        const data = await res.json();
        
        if (res.ok && data) {
          setTarifas({
            bajo: Number(data.bajo),
            medio: Number(data.medio),
            alto: Number(data.alto)
          });
        }
      } catch (error) {
        console.error("Error al sincronizar con la DB:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCostosBaseDeDatos();
  }, []);

  // 2. Guardar los cambios usando los IDs 1, 2 y 3
  const handleGuardar = async () => {
    const confirmacion = await Swal.fire({
      title: '¿Actualizar costos oficiales?',
      text: "Se modificarán los montos de los registros 1, 2 y 3 en la base de datos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#005954',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      setCargando(true);
      try {
        const res = await fetch('/api/ratess', { 
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tarifas) 
        });
        
        if (res.ok) {
          Swal.fire({
            title: '¡Éxito!',
            text: 'La tabla de tarifas ha sido actualizada.',
            icon: 'success',
            confirmButtonColor: '#005954'
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo conectar con la base de datos.', 'error');
      } finally {
        setCargando(false);
      }
    }
  };

  if (cargando && tarifas.bajo === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 italic font-black text-teal-800">
        <RefreshCw className="animate-spin mr-2" /> CARGANDO TARIFAS OFICIALES...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-lato">
      <div className="max-w-3xl mx-auto">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
            Gestión de <span className="text-teal-700">Precios Unitarios</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">
            Administración de la tabla `tarifas` (IDs: 1, 2, 3)
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-t-8 border-teal-700">
          <div className="bg-slate-900 p-4 flex items-center gap-3">
            <AlertCircle className="text-orange-500" size={20} />
            <p className="text-white text-xs font-bold uppercase">Ajuste de montos para órdenes de pago</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Registro ID 1 */}
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2 py-1 rounded-md uppercase">ID Tarifa: 1</span>
                <h3 className="text-lg font-black text-slate-800 mt-1 uppercase italic">Riesgo Bajo</h3>
              </div>
              <div className="flex items-center bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus-within:border-teal-500 transition-all">
                <span className="text-xl font-black text-teal-700 mr-2">$</span>
                <input 
                  type="number" 
                  value={tarifas.bajo}
                  onChange={(e) => setTarifas({...tarifas, bajo: parseFloat(e.target.value) || 0})}
                  className="w-24 text-2xl font-black text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Registro ID 2 */}
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2 py-1 rounded-md uppercase">ID Tarifa: 2</span>
                <h3 className="text-lg font-black text-slate-800 mt-1 uppercase italic">Riesgo Medio</h3>
              </div>
              <div className="flex items-center bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus-within:border-teal-500 transition-all">
                <span className="text-xl font-black text-teal-700 mr-2">$</span>
                <input 
                  type="number" 
                  value={tarifas.medio}
                  onChange={(e) => setTarifas({...tarifas, medio: parseFloat(e.target.value) || 0})}
                  className="w-24 text-2xl font-black text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Registro ID 3 */}
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2 py-1 rounded-md uppercase">ID Tarifa: 3</span>
                <h3 className="text-lg font-black text-slate-800 mt-1 uppercase italic">Riesgo Alto</h3>
              </div>
              <div className="flex items-center bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus-within:border-teal-500 transition-all">
                <span className="text-xl font-black text-teal-700 mr-2">$</span>
                <input 
                  type="number" 
                  value={tarifas.alto}
                  onChange={(e) => setTarifas({...tarifas, alto: parseFloat(e.target.value) || 0})}
                  className="w-24 text-2xl font-black text-slate-900 outline-none"
                />
              </div>
            </div>

            <button 
              onClick={handleGuardar}
              disabled={cargando}
              className="w-full py-4 bg-teal-700 hover:bg-teal-800 text-white font-black text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-4 uppercase italic"
            >
              {cargando ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
              Confirmar Nuevos Costos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}