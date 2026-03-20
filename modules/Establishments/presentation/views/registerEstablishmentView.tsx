"use client"

import { useState } from "react"

export default function RegistrarEstablecimientoView(){

 const [form, setForm] = useState({
  no_expediente:"",
  nombre_establecimiento:"",
  nombre_propietario:"",
  direccion:"",
  giro_comercial:"",
  estatus:"",
  observaciones:""
 })

 const handleChange = (e:any)=>{
  setForm({
   ...form,
   [e.target.name]:e.target.value
  })
 }

 const handleSubmit = async (e:any)=>{
  e.preventDefault()

  await fetch("/api/establecimientos",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify(form)
  })

  alert("Establecimiento registrado")
 }
 

 return(

   

   <div className="flex items-center justify-center min-h-screen bg-orange-500 p-6">
      <div className="bg-orange-500 w-full max-w-4xl p-8 rounded-2xl shadow-2xl">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 text-center">
          Registro
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* No. de Expediente */}
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">No. de Expediente</label>
            <input
              type="text"
              name="noExpediente"
              value={form.no_expediente}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-gray-900"
              placeholder="Ej: EXP-2026-001"
            />
          </div>

          {/* Nombre del Establecimiento */}
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Establecimiento</label>
            <input
              type="text"
              name="nombreEstablecimiento"
              value={form.nombre_establecimiento}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-gray-900"
            />
          </div>

          {/* Sección Propietario (3 columnas) */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="md:col-span-3">
              <span className="text-sm font-bold text-gray-600 uppercase">Datos del Propietario</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Nombre(s)</label>
              <input
                type="text"
                name="nombrePropietario"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Apellido Paterno</label>
              <input
                type="text"
                name="apellidoPaterno"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Apellido Materno</label>
              <input
                type="text"
                name="apellidoMaterno"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección Completa</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-gray-900"
            />
          </div>

          {/* Estatus y Giro */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Estatus</label>
            <select
              name="estatus"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
            >
              <option value="">Seleccionar...</option>
              <option value="activo">Activo</option>
              <option value="pendiente">Pendiente</option>
              <option value="clausurado">Clausurado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Giro Comercial</label>
            <input
              type="text"
              name="giroComercial"
              onChange={handleChange}
              placeholder="Ej: Restaurante, Farmacia..."
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Tamaño y Fecha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tamaño del Establecimiento ($m^2$)</label>
            <input
              type="text"
              name="tamanoEstablecimiento"
              onChange={handleChange}
              placeholder="Ej: 50m2"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Expedición</label>
            <input
              type="date"
              name="fechaExpedicion"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Observaciones */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Observaciones</label>
            <textarea
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              placeholder="Notas adicionales..."
            ></textarea>
          </div>

          {/* Botón Guardar */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full md:w-1/3 mx-auto block py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors shadow-lg text-lg"
            >
              Guardar Expediente
            </button>
          </div>

        </form>
      </div>
    </div>

 )
}
