"use client";

import React, { useState, useEffect } from 'react';
import { FileDown, Printer, ArrowLeft } from 'lucide-react';
import Image from "next/image";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface Establishment {
    id_establecimiento: number;
    nombre_establecimiento: string;
    nombre_propietario: string;
    giro: string;
    tamanio: string;
    no_expediente: string;
    id_tamanio: number;
}

export const ConfigureDocumentView = ({ id_establecimiento }: { id_establecimiento: string }) => {
    const router = useRouter();
    const [establishment, setEstablishment] = useState<Establishment | null>(null);
    const [loading, setLoading] = useState(true);
    
    // CORRECCIÓN: Se agrega el estado 'config' que faltaba
    const [config, setConfig] = useState({
        servicio: "",
        vigencia: "2026",
        estatus_pago: "Pendiente"
    });

    // REQ21: Lógica de cálculo automático basada en tamaño
    // En ConfigureDocumentView.tsx
const calcularMonto = () => {
    if (!establishment) return 0;
    
    // Ajustamos para que reconozca los IDs numéricos de tu base de datos
    const tarifas: Record<string | number, number> = { 
        1: 500,   // "chico" o ID 1
        2: 1000,  // "mediano" o ID 2
        3: 1500,  // "grande" o ID 3
        "chico": 500, 
        "mediano": 1000, 
        "grande": 1500 
    };

    // Intentamos buscar por 'id_tamanio' (que es lo que llega en la imagen b24a9d)
    // o por el string 'tamanio' como respaldo.
    const valorTamanio = establishment.id_tamanio || establishment.tamanio;
    return tarifas[valorTamanio] || 0;
};

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const res = await fetch(`/api/Establishments/${id_establecimiento}`);
                const data = await res.json();

                if (res.ok) {
                    setEstablishment(data);
                } else {
                    throw new Error("No se encontró el establecimiento");
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (id_establecimiento) fetchDatos();
    }, [id_establecimiento]);

    const handleGenerar = async () => {
  try {
    const response = await fetch('/api/documents/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        establishment: establishment,
        config: config,
        amount: calcularMonto()
      }),
    });

    if (!response.ok) throw new Error("Error al generar");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Orden_${establishment?.no_expediente}.pdf`;
    document.body.appendChild(a);
    a.click();
    
    // IMPORTANTE: Limpieza
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    Swal.fire('¡Éxito!', 'Documento generado correctamente', 'success');
  } catch (error) {
    Swal.fire('Error', 'No se pudo generar el PDF', 'error');
  }
};

    if (loading) return <div className="p-10 text-center text-white">Cargando datos del establecimiento...</div>;
    if (!establishment) return <div className="p-10 text-center text-white">No se encontró el establecimiento.</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-lato">
    
    {/* Cabecera Principal - Manteniendo coherencia con el Registro */}
    <div className="max-w-7xl mx-auto mb-12 flex flex-col items-center border-b border-slate-100 pb-10">
        <div className="p-2 mb-4">
            <Image
                src="/img/Pcblogo.png"
                alt="Logo Protección Civil"
                width={100}
                height={100}
                priority
            />
        </div>

        <div className="text-center space-y-1">
            <p className="text-3xl font-bold text-teal-700 tracking-tight leading-tight">PROTECCIÓN CIVIL</p>
            <p className="text-2xl font-semibold text-orange-600 leading-tight">Y BOMBEROS</p>
            <p className="text-lg font-normal text-slate-900 pt-1">IZÚCAR DE MATAMOROS, PUE.</p>
        </div>
    </div>

    {/* Tarjeta de Configuración */}
    <div className="max-w-4xl mx-auto bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
        
        {/* Encabezado de la Tarjeta */}
        <div className="flex justify-between items-start mb-10 pb-6 border-b border-slate-100">
            <div>
                <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Emisión de Documentos</h1>
                <p className="text-slate-500 text-lg mt-1">Configuración de certificados y órdenes de pago</p>
            </div>
            <button 
                onClick={() => router.back()}
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-teal-700 rounded-2xl transition-all border border-slate-200"
            >
                <ArrowLeft size={24} />
            </button>
        </div>

        {/* Información del Establecimiento (Highlight) */}
        <div className="mb-10 bg-teal-50 p-6 rounded-3xl border border-teal-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <span className="text-xs font-black text-teal-700 uppercase tracking-widest">Establecimiento</span>
                <h2 className="text-2xl font-bold text-slate-900">{establishment.nombre_establecimiento}</h2>
            </div>
            <div className="text-left md:text-right">
                <span className="text-xs font-black text-teal-700 uppercase tracking-widest">No. Expediente</span>
                <p className="text-lg font-mono font-bold text-slate-700">{establishment.no_expediente}</p>
            </div>
        </div>

        {/* Formulario de Selección */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col space-y-2">
                <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Seleccionar Servicio *</label>
                <select 
                    className="w-full px-4 py-3.5 text-lg border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-700 text-slate-950 shadow-sm transition-all outline-none appearance-none bg-white cursor-pointer"
                    value={config.servicio}
                    onChange={(e) => setConfig({...config, servicio: e.target.value})}
                >
                    <option value="">-- Seleccionar --</option>
                    <option value="Constancia">Constancia de Medidas Preventivas</option>
                    <option value="Orden de Pago">Orden de Pago</option>
                </select>
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Monto a Liquidar (MXN)</label>
                <div className="w-full px-6 py-3.5 text-2xl font-black bg-slate-50 border border-slate-200 rounded-2xl text-teal-700 flex justify-between items-center">
                    <span className="text-slate-400 text-sm font-bold">TOTAL</span>
                    ${calcularMonto()}.00
                </div>
            </div>
        </div>

        {/* Acciones Finales */}
        <div className="pt-8 border-t border-slate-100 text-center">
            <div className="mb-8">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
                    {config.servicio ? config.servicio : "Seleccione un trámite"}
                </h3>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                    onClick={handleGenerar}
                    disabled={!config.servicio}
                    className={`px-10 py-5 font-black rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 text-lg ${
                        !config.servicio 
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                        : "bg-teal-700 text-white hover:bg-teal-800 shadow-teal-700/20 active:scale-95"
                    }`}
                >
                    <FileDown size={24} /> {loading ? "GENERANDO..." : "GENERAR DOCUMENTO"}
                </button>

                <button 
                    onClick={() => window.print()}
                    className="px-10 py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95 text-lg flex items-center justify-center gap-3"
                >
                    <Printer size={24} /> IMPRIMIR VISTA
                </button>
            </div>
        </div>
    </div>
</div>
    );
};