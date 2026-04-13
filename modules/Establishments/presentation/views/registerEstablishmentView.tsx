"use client";

import { useState } from "react";
import Image from "next/image"; // Importamos Image para el logo corporativo
import router from "next/router";

export default function RegistrarEstablecimientoView() {
  const [form, setForm] = useState({
    no_expediente: "",
    nombre_establecimiento: "",
    nombre_propietario: "",
    direccion: "",
    giro_comercial: "",
    estatus: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica: asegura que los campos críticos no estén vacíos
    if (!form.no_expediente.trim() || !form.nombre_establecimiento.trim() || !form.direccion.trim() || !form.estatus) {
      alert("Por favor, ingrese No. de Expediente, Nombre del Establecimiento, Dirección Completa y Estatus.");
      return;
    }

    await fetch("/api/establecimientos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Establecimiento registrado");
    
    // Opcional: limpiar el formulario tras envío exitoso
    // setForm({
    //   no_expediente: "",
    //   nombre_establecimiento: "",
    //   nombre_propietario: "",
    //   direccion: "",
    //   giro_comercial: "",
    //   estatus: "",
    //   observaciones: "",
    // });
  };

  return (
    // 1. Fondo general: bg-slate-50 (Gris muy claro #F5F5F5) para limpieza
    <div className="min-h-screen bg-slate-50 p-8 font-lato">
      
      {/* 2. Cabecera Principal Integrando el Logo y Textos Corporativos */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col items-center border-b border-slate-100 pb-10">
        
        {/* Sección del Logo Corporativo */}
        <div className="p-2 mb-4">
          <Image
            src="/img/Pcblogo.png" // Asegúrate de que esta ruta sea correcta
            alt="Logo Protección Civil y Bomberos Izúcar"
            width={120} // Ligeramente más pequeño para mejor balance
            height={120}
            priority
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

      {/* 3. Tarjeta del Formulario: Añadida sombra sutil, bordes redondeados y fondo blanco */}
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
        
        {/* Título de la Sección de Registro */}
        <div className="mb-10 pb-6 border-b border-slate-100">
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Registro de Nuevo Expediente</h1>
          
          <p className="text-slate-500 text-lg mt-1">Formulario de Alta para Protección Civil</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Campo No. de Expediente (Ocupa todo el ancho en mobile, mitad en desktop) */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="no_expediente" className="text-slate-700 font-medium ml-1 text-sm">
              No. de Expediente *
            </label>
            <input
              //id="no_expediente"
              type="text"
              name="noExpediente"
              //required
              //value={form.no_expediente}
              onChange={handleChange}
              placeholder="Ej: EXP-2026-001"
              // Inputs: Estilizados con bordes sutiles y focus Teal
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Campo Nombre del Establecimiento */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="nombre_establecimiento" className="text-slate-700 font-medium ml-1 text-sm">
              Nombre del Establecimiento *
            </label>
            <input
              //id="nombre_establecimiento"
              type="text"
              name="nombreEstablecimiento"
             // required
              //value={form.nombre_establecimiento}
              onChange={handleChange}
              placeholder="Ej: Licencia Comercial Anual"
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Sección Propietario (3 columnas) */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
            <div className="md:col-span-3 pb-2 border-b border-slate-200">
              <span className="text-sm font-bold text-teal-700 uppercase tracking-widest">Datos del Propietario</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-medium text-slate-500">Nombre(s)</label>
              <input
                type="text"
                name="nombrePropietario"
                onChange={handleChange}
                placeholder="Tus nombres"
                className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-950 bg-white"
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-medium text-slate-500">Apellido Paterno</label>
              <input
                type="text"
                name="apellidoPaterno"
                onChange={handleChange}
                placeholder="Tus apellidos"
                className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-950 bg-white"
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-medium text-slate-500">Apellido Materno</label>
              <input
                type="text"
                name="apellidoMaterno"
                onChange={handleChange}
                placeholder="Tus apellidos"
                className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-950 bg-white"
              />
            </div>
          </div>

          {/* Campo Dirección Completa */}
          <div className="md:col-span-2 flex flex-col space-y-2">
            <label htmlFor="direccion" className="text-slate-700 font-medium ml-1 text-sm">
              Dirección Completa *
            </label>
            <input
              id="direccion"
              type="text"
              name="direccion"
              required
              value={form.direccion}
              onChange={handleChange}
              placeholder="Ej: Calle 16 de Septiembre s/n, Izúcar"
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Estatus y Giro */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="estatus" className="text-slate-700 font-medium ml-1 text-sm">
              Estatus *
            </label>
            <select
              id="estatus"
              name="estatus"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg bg-white text-slate-950 shadow-sm focus:ring-2 focus:ring-teal-200 focus:border-teal-700 outline-none transition-all"
            >
              <option value="">Seleccionar...</option>
              <option value="activo">Activo</option>
              <option value="pendiente">Pendiente</option>
              <option value="clausurado">Clausurado</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="giroComercial" className="text-slate-700 font-medium ml-1 text-sm">
              Giro Comercial
            </label>
            <input
              id="giroComercial"
              type="text"
              name="giroComercial"
              onChange={handleChange}
              placeholder="Ej: Restaurante, Farmacia..."
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Tamaño y Fecha */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="tamanoEstablecimiento" className="text-slate-700 font-medium ml-1 text-sm">
              Tamaño del Establecimiento ($m^2$)
            </label>
            <input
              id="tamanoEstablecimiento"
              type="number"
              name="tamanoEstablecimiento"
              onChange={handleChange}
              placeholder="Ej: 50"
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="fechaExpedicion" className="text-slate-700 font-medium ml-1 text-sm">
              Fecha de Expedición
            </label>
            <input
              id="fechaExpedicion"
              type="date"
              name="fechaExpedicion"
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Observaciones (Ocupa todo el ancho) */}
          <div className="md:col-span-2 flex flex-col space-y-2">
            <label htmlFor="observaciones" className="text-slate-700 font-medium ml-1 text-sm">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
              placeholder="Notas adicionales..."
            ></textarea>
          </div>

          {/* Botón Principal: Cambiado de bg-gray-300 a bg-teal-700 (#1E838F) */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition duration-300 shadow-md shadow-teal-700/20 active:scale-95 text-xl flex items-center justify-center gap-2"
              onClick={() => router.push("/Establishments")}
            >
              <span>🚪</span>
              Guardar Establecimiento
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}