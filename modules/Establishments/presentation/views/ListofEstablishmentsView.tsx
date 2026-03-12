"use client"

import { useEffect, useState } from "react"

export default function ListoEstablishmentsView() {

  const [establecimientos, setEstablecimientos] = useState<any[]>([])

  useEffect(() => {

    const obtenerEstablecimientos = async () => {

      const res = await fetch("/api/establishments")
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

      <h1 style={{marginBottom:"15px"}}>Establecimientos</h1>

      <table style={{
        width:"100%",
        borderCollapse:"collapse",
        fontFamily:"Arial, sans-serif",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
      }}>

        <thead style={{backgroundColor:"#00bbff", color:"white"}}>
          <tr>
            <th style={styles.th}>Expediente</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Propietario</th>
            <th style={styles.th}>Dirección</th>
            <th style={styles.th}>Estatus</th>
          </tr>
        </thead>

        <tbody>

          {establecimientos.map((e:any, index:number) => (

            <tr 
              key={e.id_establecimiento}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white"
              }}
            >

              <td style={styles.td}>{e.no_expediente}</td>
              <td style={styles.td}>{e.nombre_establecimiento}</td>
              <td style={styles.td}>{e.nombre_propietario}</td>
              <td style={styles.td}>{e.direccion}</td>
              <td style={styles.td}>{e.estatus}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

const styles = {

  th:{
    padding:"12px",
    textAlign:"left" as const
  },

  td:{
    padding:"10px",
    borderBottom:"1px solid #ddd"
  }

}