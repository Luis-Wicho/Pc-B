"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ListoEstablishmentsView() {
  const router = useRouter()
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

    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#ff9900" }}>

      {/* TITULO */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{
          fontWeight: "bold",
          fontSize: "48px",
          color: "rgb(31, 41, 55)",
          margin: 0
        }}>
          Lista De Establecimientos
        </h1>
        <div style={{
        display:"flex",
        alignContent:"left",
        marginBottom:"30px",
        
      }}>
        <Image
          src="/img/Pcblogo.png"
          alt="Logo PcB"
          width={200}
          height={100}
          style={{
          }}
        />
      </div>
      </div>

      {/* BUSCADOR */}
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "20px",
        alignItems: "center"
      }}>
        <span style={{ marginRight: "10px", fontWeight: "bold" }}>Buscar</span>
        <input
          type="text"
          placeholder=""
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: "6px 10px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #999"
          }}
        />
      </div>

      {/* TABLA */}
      <table style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        fontSize: "14px"
        
      }}>

        <thead style={{ backgroundColor: "#D3D3D3", color: "#000" }}>
          <tr>
            <th style={styles.th}>No. Expe Fecha E</th>
            <th style={styles.th}>Establecimiento</th>
            <th style={styles.th}>Propietario</th>
            <th style={styles.th}>Dirección</th>
            <th style={styles.th}>Estatu</th>
            <th style={styles.th}>Giro</th>
            <th style={styles.th}>Tama</th>
            <th style={styles.th}>No. Ofici</th>
            <th style={styles.th}>Observac</th>
            <th style={styles.th}>Accio</th>
          </tr>
        </thead>

        <tbody>
          {establecimientosFiltrados.map((e: any, index: number) => (
            <tr
              key={e.id_establecimiento || index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white"
              }}
            >
              <td style={styles.td}>{e.no_expediente || ""}</td>
              <td style={styles.td}>{e.nombre_establecimiento}</td>
              <td style={styles.td}>{e.nombre_propietario}</td>
              <td style={styles.td}>{e.direccion}</td>
              <td style={styles.td}>
                <span style={{
                  color: e.estatus === "Activo" ? "#2ECC71" : 
                         e.estatus === "Pendi" ? "#F39C12" : 
                         e.estatus === "Inactiv" ? "#E74C3C" : "inherit",
                  fontWeight: e.estatus ? "bold" : "normal"
                }}>
                  {e.estatus || ""}
                </span>
              </td>
              <td style={styles.td}>{e.giro || ""}</td>
              <td style={styles.td}>{e.tama || ""}</td>
              <td style={styles.td}>{e.no_oficio || ""}</td>
              <td style={styles.td}>{e.observaciones || ""}</td>
              <td style={styles.td}>
                <button style={styles.checkBtn}>☑️</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* BOTON REGISTRAR Y PAGINACION */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px"
      }}>
        <button
  onClick={() => router.push("/Establishments/register")}
  style={{
    backgroundColor: "#27AE60",
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
  }}
>
  Registrar nuevo establecimiento
</button>

        <div style={{
          display: "flex",
          gap: "8px",
          fontSize: "16px"
        }}>
          <span style={styles.pageItem}>«</span>
          <span style={{...styles.pageItem, fontWeight:"bold"}}>1</span>
          <span style={styles.pageItem}>2</span>
          <span style={styles.pageItem}>3</span>
          <span style={styles.pageItem}>4</span>
          <span style={styles.pageItem}>»</span>
        </div>
      </div>

    </div>

  )
}

const styles = {

  th: {
    padding: "10px 8px",
    textAlign: "left" as const,
    fontWeight: "bold",
    borderBottom: "1px solid #aaa",
    fontSize: "13px"
  },

  td: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    fontSize: "13px"
  },

  checkBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#555",
    padding: "0 5px"
  },

  pageItem: {
    padding: "4px 8px",
    cursor: "pointer",
    color: "#2980B9"
  }

}