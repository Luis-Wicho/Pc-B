"use client";

import React, { useEffect, useState  } from "react";
import Image  from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";



// Iconos para las tarjetas de reporte
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-80"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-80"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>;
const MoneyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-80"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-80"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8l3.4-1.9a.75.75 0 0 1 1.05.95l-.7 1.21ZM9 9.61a6 6 0 1 1 2.27 11.73V15.5l-3.4 1.9a.75.75 0 0 1-1.05-.95l.7-1.21A5.97 5.97 0 0 1 9 9.61Z" /></svg>;

interface ReportData {
  totalEstablecimientos: number;
  totalUsuarios: number;
  totalIngresos: number;
  actividades: number;
}

export default function ReportsPage() {
    const router = useRouter();
  const [data, setData] = useState<ReportData>({
    totalEstablecimientos: 0,
    totalUsuarios: 0,
    totalIngresos: 0,
    actividades: 0
  });

  const [cargando, setCargando] = useState(true);

  // Aquí conectarás con tu Supabase/API en el futuro
  const loadReports = async () => {
    setCargando(true);
    // Simulación de delay de red
    setTimeout(() => {
      setData({
        totalEstablecimientos: 25,
        totalUsuarios: 10,
        totalIngresos: 15000,
        actividades: 8
      });
      setCargando(false);
    }, 800);
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-lato">
      <div className="max-w-7xl mx-auto">
        <div className="no-print flex justify-start mb-4">
                    <button 
                        onClick={() => router.back()}
                        className="p-3 bg-white hover:bg-slate-100 text-slate-400 hover:text-teal-700 rounded-2xl transition-all border border-slate-200"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>
        
        {/* Cabecera de Identidad */}
        <header className="flex flex-col items-center mb-12 text-center">
          <div className="p-2 mb-4">
            <Image
              src="/img/Pcblogo.png"
              alt="Logo Protección Civil"
              width={140}
              height={140}
              priority
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-teal-700 tracking-tighter uppercase">Panel de Reportes</h1>
            <p className="text-orange-600 font-bold text-xl uppercase tracking-widest">Estadísticas y Actividades</p>
            <div className="w-20 h-1 bg-slate-200 mx-auto mt-4"></div>
          </div>
        </header>

        {/* Mallas de Tarjetas (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/Establishments">
          <CardReport 
            titulo="Establecimientos" 
            valor={data.totalEstablecimientos} 
            color="teal" 
            icono={<BuildingIcon />}
          />
          </Link>
          <Link href="/users">
          <CardReport 
            titulo="Usuarios" 
            valor={data.totalUsuarios} 
            color="orange" 
            icono={<UsersIcon />}
            />
          </Link>

          <Link href="/rates">
          <CardReport 
            titulo="Ingresos Totales" 
            valor={`$${data.totalIngresos.toLocaleString()}`} 
            color="teal" 
            icono={<MoneyIcon />} 
          />
          </Link>
          
          <Link href="/Reports/activities">
          <CardReport 
            titulo="Actividades" 
            valor={data.actividades} 
            color="orange" 
            icono={<ActivityIcon />} 
          />
          </Link>
          

        </div>

        {/* Sección de Detalle de Actividades (Tabla) */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Detalle de Actividades Recientes</h2>
              <p className="text-slate-500 font-medium">Historial de inspecciones y eventos del sistema</p>
            </div>
            <button 
              onClick={loadReports}
              className="p-3 bg-slate-50 text-teal-700 rounded-2xl hover:bg-teal-50 transition-colors border border-slate-100"
              title="Actualizar datos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Nombre</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Descripción</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {/* Aquí harás el .map de tus datos reales */}
                {/* Ejemplo vacío pero con estilo: */}
                <tr className="group hover:bg-teal-50/20 transition-all cursor-default">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                      <span className="font-bold text-slate-800 text-lg">Inspección de Seguridad</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-medium italic">2026-04-15</td>
                  <td className="px-8 py-6 text-slate-600">Revisión periódica de extintores y señalética en local comercial.</td>
                  <td className="px-8 py-6 text-right">
                    <span className="bg-teal-100 text-teal-800 text-xs font-black px-4 py-2 rounded-full uppercase">Completado</span>
                  </td>
                </tr>
                
                <tr className="group hover:bg-teal-50/20 transition-all cursor-default">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="font-bold text-slate-800 text-lg">Reunión Operativa</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-medium italic">2026-04-16</td>
                  <td className="px-8 py-6 text-slate-600">Planeación mensual de brigadas y capacitación.</td>
                  <td className="px-8 py-6 text-right">
                    <span className="bg-orange-100 text-orange-800 text-xs font-black px-4 py-2 rounded-full uppercase">Pendiente</span>
                  </td>
                </tr>

                {/* Fila vacía para mostrar espacio */}
                {[...Array(3)].map((_, i) => (
                  <tr key={i} className="opacity-30">
                    <td className="px-8 py-6 font-medium italic text-slate-300">Dato pendiente...</td>
                    <td className="px-8 py-6 italic text-slate-300">-</td>
                    <td className="px-8 py-6 italic text-slate-300">-</td>
                    <td className="px-8 py-6 text-right italic text-slate-300">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-slate-50/50 text-center border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fin del reporte actual</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-componente para las tarjetas
function CardReport({ titulo, valor, color, icono }: { titulo: string, valor: any, color: 'teal' | 'orange', icono: any }) {
  const styles = {
    teal: "text-teal-700 bg-teal-50 border-teal-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100"
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${styles[color]}`}>
        {icono}
      </div>
      <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">{titulo}</h3>
      <p className={`text-4xl font-black tracking-tighter ${color === 'teal' ? 'text-teal-800' : 'text-orange-700'}`}>
        {valor}
      </p>
    </div>
  );
}