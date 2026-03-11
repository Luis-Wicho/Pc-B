"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function DetalleEstablecimientoView(){

 const {id} = useParams()

 const [establecimiento,setEstablecimiento] = useState<any>(null)

 useEffect(()=>{

  fetch(`/api/establecimientos/${id}`)
  .then(res=>res.json())
  .then(data=>setEstablecimiento(data))

 },[id])

 if(!establecimiento) return <p>Cargando...</p>

 return(

  <div>

   <h1>Detalle del establecimiento</h1>

   <p><b>Expediente:</b> {establecimiento.no_expediente}</p>
   <p><b>Nombre:</b> {establecimiento.nombre_establecimiento}</p>
   <p><b>Propietario:</b> {establecimiento.nombre_propietario}</p>
   <p><b>Dirección:</b> {establecimiento.direccion}</p>
   <p><b>Giro:</b> {establecimiento.giro_comercial}</p>
   <p><b>Estatus:</b> {establecimiento.estatus}</p>
   <p><b>Observaciones:</b> {establecimiento.observaciones}</p>

  </div>

 )

}