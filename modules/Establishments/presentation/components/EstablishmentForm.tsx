"use client"

import { useState } from "react"
import { Establishment } from "@/modules/Establishments/domain/establishment.entity"
import { createEstablishment } from "../actions/createEstablishment.action"

export default function EstablishmentForm() {

  const [form, setForm] = useState<Partial<Establishment>>({
    no_expediente: "",
    nombre_establecimiento: "",
    nombre_propietario: "",
    direccion: "",
    giro_comercial: "",
    estatus: "",
    observaciones: ""
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createEstablishment(form)

      alert("Establecimiento creado correctamente")

      setForm({
        no_expediente: "",
        nombre_establecimiento: "",
        nombre_propietario: "",
        direccion: "",
        giro_comercial: "",
        estatus: "",
        observaciones: ""
      })

    } catch (error) {
      alert("Error al crear establecimiento")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="no_expediente" value={form.no_expediente || ""} onChange={handleChange} placeholder="No. Expediente" />
      <input name="nombre_establecimiento" value={form.nombre_establecimiento || ""} onChange={handleChange} placeholder="Nombre" />
      <input name="nombre_propietario" value={form.nombre_propietario || ""} onChange={handleChange} placeholder="Propietario" />
      <input name="direccion" value={form.direccion || ""} onChange={handleChange} placeholder="Dirección" />
      <input name="giro_comercial" value={form.giro_comercial || ""} onChange={handleChange} placeholder="Giro comercial" />
      <input name="estatus" value={form.estatus || ""} onChange={handleChange} placeholder="Estatus" />
      <textarea name="observaciones" value={form.observaciones || ""} onChange={handleChange} placeholder="Observaciones" />
      
      <button type="submit">Crear</button>
    </form>
  )
}