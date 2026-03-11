"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function EditarEstablecimientoView(){

 const {id} = useParams()

 const [form,setForm] = useState<any>({})

 useEffect(()=>{

  fetch(`/api/establecimientos/${id}`)
  .then(res=>res.json())
  .then(data=>setForm(data))

 },[id])

 const handleChange = (e:any)=>{

  setForm({
   ...form,
   [e.target.name]:e.target.value
  })

 }

 const handleSubmit = async (e:any)=>{
  e.preventDefault()

  await fetch(`/api/establecimientos/${id}`,{

   method:"PUT",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify(form)

  })

  alert("Actualizado correctamente")

 }

 return(

  <div>

   <h1>Editar Establecimiento</h1>

   <form onSubmit={handleSubmit}>

    <input
     name="nombre_establecimiento"
     value={form.nombre_establecimiento || ""}
     onChange={handleChange}
    />

    <input
     name="nombre_propietario"
     value={form.nombre_propietario || ""}
     onChange={handleChange}
    />

    <input
     name="direccion"
     value={form.direccion || ""}
     onChange={handleChange}
    />

    <button>
     Guardar cambios
    </button>

   </form>

  </div>

 )

}