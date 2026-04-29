"use client";

import React, { useState, useEffect } from 'react';
import { Printer, ArrowLeft } from 'lucide-react';
import Image from "next/image";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface Establishment {
    id_establecimiento: number;
    nombre_establecimiento: string;
    nombre_propietario: string;
    giro_comercial: string;
    tamanio: string;
    no_expediente: string;
    id_tamanio: number;
}

export const ConfigureDocumentView = ({ id_establecimiento }: { id_establecimiento: string }) => {
    const router = useRouter();
    const [establishment, setEstablishment] = useState<Establishment | null>(null);
    const [loading, setLoading] = useState(true);
    const [tarifasOficiales, setTarifasOficiales] = useState<Record<number, number>>({});
    const [config, setConfig] = useState({
        servicio: "",
        vigencia: "2026",
        estatus_pago: "Pendiente"
    });

    const calcularMonto = () => {
    if (!establishment) return 0;

    // Obtenemos el ID del tamaño/riesgo del establecimiento
    const idTamanio = Number(establishment.id_tamanio || establishment.tamanio);

    // Retornamos el monto que coincida con el ID (1, 2 o 3)
    // Si no hay coincidencia o la API no ha cargado, devolvemos 0
    return tarifasOficiales[idTamanio] || 0;
};

    useEffect(() => {
    const fetchDatosGenerales = async () => {
        try {
            // Ejecutamos ambas peticiones al mismo tiempo para mayor velocidad
            const [resEst, resTarifas] = await Promise.all([
                fetch(`/api/Establishments/${id_establecimiento}`),
                fetch(`/api/ratess`)
            ]);

            const dataEst = await resEst.json();
            const dataTarifas = await resTarifas.json();

            if (!resEst.ok) throw new Error("No se encontró el establecimiento");
            
            // 1. Guardamos el establecimiento
            setEstablishment(dataEst);

            // 2. Guardamos las tarifas mapeando los IDs de tu tabla tarifas
            if (resTarifas.ok) {
                setTarifasOficiales({
                    1: dataTarifas.bajo,   // ID 1 en Supabase
                    2: dataTarifas.medio,  // ID 2 en Supabase
                    3: dataTarifas.alto    // ID 3 en Supabase
                });
            }

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo sincronizar con la base de datos', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (id_establecimiento) fetchDatosGenerales();
}, [id_establecimiento]);

    if (loading) return <div className="p-10 text-center text-white">Cargando datos...</div>;
    if (!establishment) return <div className="p-10 text-center text-white">No se encontró el establecimiento.</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-lato">
            {/* ESTILOS DE IMPRESIÓN CRÍTICOS */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: letter;
                        margin: 10mm;
                    }
                    body {
                        background-color: white !important;
                        -webkit-print-color-adjust: exact;
                    }
                    /* Ocultar botones y elementos de navegación al imprimir */
                    .no-print {
                        display: none !important;
                    }
                    /* Ajustar el contenedor para que quepa en la hoja */
                    .print-container {
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                    .main-bg {
                        background-color: white !important;
                        padding: 0 !important;
                    }
                }
            `}</style>

            <div className="max-w-4xl mx-auto main-bg">
                {/* Botón Volver (Oculto en impresión) */}
                <div className="no-print flex justify-start mb-4">
                    <button 
                        onClick={() => router.back()}
                        className="p-3 bg-white hover:bg-slate-100 text-slate-400 hover:text-teal-700 rounded-2xl transition-all border border-slate-200"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>

                {/* Contenedor que se imprimirá */}
                <div className="print-container bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
                    
                    {/* Cabecera (Logo y Títulos) */}
                    <div className="flex flex-col items-center border-b border-slate-100 pb-8 mb-8">
                        <div className="mb-4">
                            <Image
                                src="/img/Pcblogo.png"
                                alt="Logo Protección Civil"
                                width={80}
                                height={80}
                                priority
                            />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-2xl font-bold text-teal-700 tracking-tight">PROTECCIÓN CIVIL Y BOMBEROS</p>
                            <p className="text-lg font-semibold text-orange-600">IZÚCAR DE MATAMOROS, PUE.</p>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest pt-2">Orden de Pago - Vigencia {config.vigencia}</p>
                        </div>
                    </div>

                    {/* Título del Documento */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight text-center uppercase">
                            {config.servicio || "ORDEN DE PAGO"}
                        </h1>
                    </div>

                    {/* Datos del Establecimiento */}
                    <div className="grid grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div>
                            <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest block">Establecimiento</span>
                            <h2 className="text-xl font-bold text-slate-900 leading-tight">{establishment.nombre_establecimiento}</h2>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest block">No. Expediente</span>
                            <p className="text-xl font-mono font-bold text-slate-700">{establishment.no_expediente}</p>
                        </div>
                        <div className="mt-2">
                            <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest block">Propietario</span>
                            <p className="text-slate-700 font-medium">{establishment.nombre_propietario}</p>
                        </div>
                        <div className="text-right mt-2">
                            <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest block">Giro Comercial</span>
                            <p className="text-slate-700 font-medium">{establishment.giro_comercial}</p>
                        </div>
                    </div>

                    {/* Configuración (Solo visible en pantalla) */}
                    

                    {/* Detalle del Monto */}
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 mb-10 flex flex-col items-center">
                        <span className="text-slate-500 font-bold mb-2 uppercase tracking-widest text-xs">Monto Total a Liquidar</span>
                        <div className="text-5xl font-black text-teal-700">
                            ${calcularMonto()}.00 <span className="text-lg text-slate-400 font-bold">MXN</span>
                        </div>
                        <p className="mt-4 text-slate-500 text-sm italic">Esta orden tiene validez para el ejercicio fiscal {config.vigencia}</p>
                    </div>

                    {/* Espacio para Firmas (Solo visible en Impresión) */}
                    <div className="hidden print:grid grid-cols-2 gap-20 mt-16 pt-10 text-center">
                        <div className="border-t border-slate-400 pt-4">
                            <p className="text-xs font-bold uppercase">Sello de la Dirección</p>
                        </div>
                        <div className="border-t border-slate-400 pt-4">
                            <p className="text-xs font-bold uppercase">Firma del Interesado</p>
                        </div>
                    </div>

                    {/* Botón de Impresión (Oculto en impresión) */}
                    <div className="no-print pt-8 border-t border-slate-100 flex justify-center">
                        <button 
                            onClick={() => window.print()}
                            className="px-12 py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95 text-xl flex items-center justify-center gap-3"
                        >
                            <Printer size={28} /> IMPRIMIR ORDEN
                        </button>
                    </div>
                </div>
                
                <p className="no-print text-center text-slate-400 text-sm mt-8">
                    Verifique que el tamaño de papel en la configuración de impresión sea "Carta" o "Letter".
                </p>
            </div>
        </div>
    );
};