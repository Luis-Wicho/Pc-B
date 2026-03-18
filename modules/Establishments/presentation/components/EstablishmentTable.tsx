"use client"

import { useEffect, useState } from "react"
import { Establishment } from "@/modules/Establishments/domain/establishment.entity"
import {createEstablishment} from "@/modules/Establishments/presentation/actions/deleteEstablishment.action"
export default function EstablishmentTable() {

  const [establishments, setEstablishments] = useState<Establishment[]>([])

  const fetchData = async () => {
    const res = await fetch("/api/establecimientos")
    const data = await res.json()
    setEstablishments(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      //await deleteEstablishment({id})
      setEstablishments(prev =>
        prev.filter(e => e.id_establecimiento !== id)
      )
    } catch (error) {
      alert("Error al eliminar")
    }
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>

      <thead style={{ backgroundColor: "#2c3e50", color: "white" }}>
        <tr>
          <th style={styles.th}>Expediente</th>
          <th style={styles.th}>Nombre</th>
          <th style={styles.th}>Propietario</th>
          <th style={styles.th}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {establishments.map((e, i) => (
          <tr
            key={e.id_establecimiento}
            style={{
              backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white"
            }}
          >
            <td style={styles.td}>{e.no_expediente}</td>
            <td style={styles.td}>{e.nombre_establecimiento}</td>
            <td style={styles.td}>{e.nombre_propietario}</td>
            <td style={styles.td}>
              <button onClick={() => handleDelete(e.id_establecimiento)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}

const styles = {
  th: {
    padding: "10px",
    textAlign: "left" as const
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd"
  }
}