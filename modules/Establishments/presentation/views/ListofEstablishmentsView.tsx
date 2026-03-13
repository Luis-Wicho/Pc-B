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
      console.log(data)
 
      if(!data.error){
        setEstablecimientos(data)
      }
      else{
        alert(data.error)
      }
      const establecimientosFiltrados = establecimientos.filter((e:any) =>
  e.nombre_establecimiento.toLowerCase().includes(busqueda.toLowerCase())
)

    }

    obtenerEstablecimientos()

  }, [])

  return (

    <div>
      <div style={{textAlign: "center"}}>
        <h1 style={{marginBottom:"15px", fontFamily:"Arial, sans-serif", fontWeight:"bold", fontSize:"80px", color:"#000000"}}>Establecimientos</h1>
      </div>

      <div style={{display:"flex", justifyContent:"center", marginBottom:"25px"}}>
  <Image
    src="/img/logoPC&B.png"
    alt="Establecimientos"
    width={200}
    height={50}
    style={{
      borderRadius:"12px",
      boxShadow:"0 4px 12px rgb(0, 0, 0)",
      objectFit:"cover"
    }}
  />
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
</div>

      <table style={{
        width:"100%",
        borderCollapse:"collapse",
        fontFamily:"Arial, sans-serif",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
      }}>

        <thead style={{backgroundColor:"#2980B9", color:"white"}}>
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