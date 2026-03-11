"use client"

import { error } from "node:console"
import { useEffect, useState } from "react"

export default function ListaEstablecimientosView() {

  const [establecimientos, setEstablecimientos] = useState<any[]>([])

  useEffect(() => {

    const obtenerEstablecimientos = async () => {

      const res = await fetch("/api/establecimientos")
      const data = await res.json()
      console.log(data)
      if(!data.error){
        setEstablecimientos(data)
      }
      else{
        alert(data.error)
      }

    }

    obtenerEstablecimientos()

  }, [])

  return (

    <div>

      <h1>Establecimientos</h1>

      <table border={1}>

        <thead>
          <tr>
            <th>Expediente</th>
            <th>Nombre</th>
            <th>Propietario</th>
            <th>Dirección</th>
            <th>Estatus</th>
          </tr>
        </thead>

        <tbody>

          {establecimientos.map((e:any) => (

            <tr key={e.id_establecimiento}>

              <td>{e.no_expediente}</td>
              <td>{e.nombre_establecimiento}</td>
              <td>{e.nombre_propietario}</td>
              <td>{e.direccion}</td>
              <td>{e.estatus}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}