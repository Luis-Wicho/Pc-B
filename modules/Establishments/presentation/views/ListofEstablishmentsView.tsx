"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function ListoEstablishmentsView() {

  const [establecimientos, setEstablecimientos] = useState<any[]>([])
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {

    const obtenerEstablecimientos = async () => {

      const res = await fetch("/api/establishments")
      const data = await res.json()

      if(!data.error){
        setEstablecimientos(data)
      }else{
        alert(data.error)
      }

    }

    obtenerEstablecimientos()

  }, [])

  // FILTRO DE BUSQUEDA
  const establecimientosFiltrados = establecimientos.filter((e:any) =>
    e.nombre_establecimiento.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (

    <div>

      {/* TITULO */}
      <div style={{textAlign:"center", marginBottom:"20px"}}>
        <h1 style={{
          fontFamily:"Arial",
          fontWeight:"bold",
          fontSize:"60px",
          color:"#000"
        }}>
          Establecimientos
        </h1>
      </div>

      {/* LOGO */}
      <div style={{
        display:"flex",
        justifyContent:"center",
        marginBottom:"30px"
      }}>
        <Image
          src="/img/logo_pcb.png"
          alt="Logo PcB"
          width={220}
          height={120}
          style={{
            borderRadius:"10px",
            boxShadow:"0 6px 15px rgba(0,0,0,0.25)"
          }}
        />
      </div>

      {/* BUSCADOR Y BOTON */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        marginBottom:"20px",
        alignItems:"center"
      }}>

        <input
          type="text"
          placeholder="Buscar establecimiento..."
          value={busqueda}
          onChange={(e)=>setBusqueda(e.target.value)}
          style={{
            padding:"8px",
            width:"250px",
            borderRadius:"6px",
            border:"1px solid #ccc"
          }}
        />

        <button style={{
          backgroundColor:"#27AE60",
          color:"white",
          padding:"10px 15px",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer",
          fontWeight:"bold"
        }}>
          + Registrar
        </button>

      </div>

      {/* TABLA */}
      <table style={{
        width:"100%",
        borderCollapse:"collapse",
        fontFamily:"Arial",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
      }}>

        <thead style={{backgroundColor:"#2980B9", color:"white"}}>
          <tr>
            <th style={styles.th}>Expediente</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Propietario</th>
            <th style={styles.th}>Dirección</th>
            <th style={styles.th}>Estatus</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {establecimientosFiltrados.map((e:any, index:number) => (

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

              <td style={styles.td}>

                <button style={{
                  backgroundColor:"#F39C12",
                  color:"white",
                  border:"none",
                  padding:"5px 10px",
                  marginRight:"5px",
                  borderRadius:"4px",
                  cursor:"pointer"
                }}>
                  Editar
                </button>

                <button style={{
                  backgroundColor:"#E74C3C",
                  color:"white",
                  border:"none",
                  padding:"5px 10px",
                  borderRadius:"4px",
                  cursor:"pointer"
                }}>
                  Eliminar
                </button>

              </td>

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