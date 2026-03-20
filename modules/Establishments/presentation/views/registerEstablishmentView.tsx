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

   

  <div>


   <h1>Registrar Establecimiento</h1>

   <form onSubmit={handleSubmit}>

    <input name="no_expediente" placeholder="No expediente" onChange={handleChange}/>

    <input name="nombre_establecimiento" placeholder="Nombre establecimiento" onChange={handleChange}/>

    <input name="nombre_propietario" placeholder="Propietario" onChange={handleChange}/>

    <input name="direccion" placeholder="Dirección" onChange={handleChange}/>

    <input name="giro_comercial" placeholder="Giro comercial" onChange={handleChange}/>

    <input name="estatus" placeholder="Estatus" onChange={handleChange}/>

    <input name="observaciones" placeholder="Observaciones" onChange={handleChange}/>

    <button type="submit">
     Registrar
    </button>

   </form>

  </div>

 )
}
