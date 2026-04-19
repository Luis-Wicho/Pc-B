"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, FileDown, Printer, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

export const ConfigureDocumentView = ({ id_establecimiento }: { id_establecimiento: string }) => {
  const [datos, setDatos] = useState<any>(null);
  const [config, setConfig] = useState({
    servicio: "",
    vigencia: "2026",
    estatus_pago: "Pendiente"
  });

  // REQ21: Lógica de cálculo automático basada en tamaño
  const calcularMonto = () => {
    if (!datos) return 0;
    const tarifas: any = { "chico": 500, "mediano": 1500, "grande": 3000 };
    return tarifas[datos.tamanio?.toLowerCase()] || 0;
  };

  useEffect(() => {
    // Aquí cargarías los datos específicos del establecimiento por ID
    fetch(`/api/Establishments/${id_establecimiento}`)
      .then(res => res.json())
      .then(data => setDatos(data));
  }, [id_establecimiento]);

  const handleGenerar = async () => {
  try {
    const response = await fetch('/api/documents/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        establishment: datos,
        config: config,
        amount: calcularMonto()
      }),
    });

    if (response.ok) {
    // REQ19: Mensaje de éxito según flujo de eventos
    Swal.fire({
      title: '¡Documento generado!',
      text: 'La operación se ha guardado en el historial correctamente.',
      icon: 'success',
      confirmButtonColor: '#0f766e'
    });
  }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.servicio}_${datos.no_expediente}.pdf`;
    a.click();
    
    Swal.fire('¡Éxito!', 'Documento generado correctamente', 'success');
  } catch (error) {
    Swal.fire('Error', 'No se pudo generar el PDF', 'error');
  }
};

  if (!datos) return <div className="p-10 text-center">Cargando datos del establecimiento...</div>;

  return (
    <div className="min-h-screen bg-orange-500 p-4 md:p-8 rounded-3xl">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-[3rem] p-8 shadow-2xl border border-white/20">
        
        {/* Encabezado */}
        <div className="flex justify-between items-start mb-10 text-white">
          <div>
            <h2 className="text-2xl font-bold uppercase">Protección Civil</h2>
            <div className="bg-white text-orange-600 px-4 py-2 rounded-xl mt-2 inline-block">
              <p className="font-bold">Establecimiento: <span className="font-normal">{datos.nombre_establecimiento}</span></p>
              <p className="font-bold">Expediente: <span className="font-normal">{datos.no_expediente}</span></p>
            </div>
          </div>
          <button className="p-3 bg-white/20 hover:bg-white/40 rounded-2xl transition">
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Formulario Estilo Prototipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <label className="block text-white font-medium">Seleccionar Servicio</label>
            <select 
              className="w-full p-4 rounded-2xl border-none outline-none focus:ring-4 focus:ring-orange-300"
              onChange={(e) => setConfig({...config, servicio: e.target.value})}
            >
              <option value="">-- Seleccionar --</option>
              <option value="Constancia">Constancia de Medidas Preventivas</option>
              <option value="Orden">Orden de Pago</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-white font-medium">Precio (MXN)</label>
            <div className="w-full p-4 rounded-2xl bg-white/20 text-white font-bold text-xl border border-white/30">
              ${calcularMonto()}.00
            </div>
          </div>
        </div>

        {/* Sección de Acción Inferior */}
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Orden de Cobro</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleGenerar}
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:scale-105 transition shadow-lg flex items-center gap-2"
            >
              <FileDown size={20} /> Generar Orden de Pago
            </button>
            <button className="px-8 py-4 bg-orange-700 text-white font-bold rounded-2xl hover:bg-orange-800 transition flex items-center gap-2">
              <Printer size={20} /> Imprimir
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};