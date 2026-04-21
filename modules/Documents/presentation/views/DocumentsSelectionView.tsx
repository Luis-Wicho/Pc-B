"use client";

import React, { useState, useEffect } from 'react';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Establishment {
  id_establecimiento: number;
  nombre_establecimiento: string;
  no_expediente: string; // Importante: usamos el nombre de tu BD
}

export const DocumentsSelectionView = () => {
  const [busqueda, setBusqueda] = useState("");
  const [establecimientos, setEstablecimientos] = useState<Establishment[]>([]);
  const router = useRouter();

  // Reutilizamos la lógica de obtención de datos que ya tienes
  useEffect(() => {
    const fetchEstablecimientos = async () => {
      const res = await fetch("/api/Establishments");
      const data = await res.json();
      if (!data.error) setEstablecimientos(data);
    };
    fetchEstablecimientos();
  }, []);

  const filtrados = establecimientos.filter(e => 
    e.nombre_establecimiento.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.no_expediente.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Generación de Documentos</h1>
        <p className="text-slate-500">Seleccione un establecimiento para emitir una constancia u orden de pago.</p>
      </div>

      {/* Buscador Estilizado */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por nombre o número de expediente..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition shadow-sm"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtrados.map((e) => (
          <div 
            key={e.id_establecimiento}
            onClick={() => router.push(`/Documents/configure/${e.id_establecimiento}`)}
            className="group p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-200 cursor-pointer transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-700">{e.nombre_establecimiento}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{e.no_expediente}</p>
              </div>
            </div>
            <ArrowRight className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};