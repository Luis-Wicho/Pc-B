"use client"

import { useEffect, useState } from "react"

export default function listofEstablishmentsView() {

  const [establishments, setEstablecimientos] = useState<any[]>([])

  useEffect(() => {

    const obtenerEstablecimientos = async () => {

      const res = await fetch("/api/establishments")
      const data = await res.json()
      console.log(data)
      if(data)
      setEstablecimientos(data)
    }

    obtenerEstablecimientos()

  }, [])

  return (

    <div style={{ padding: "20px" }}>
      
      {/* Título */}
      <h1 style={{ marginBottom: "80px" }}>
        Lista de Establecimientos
      </h1>

      {/* Tabla */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        
        <thead style={{ backgroundColor: "#8e5319" }}>
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
          {establishments.length === 0 ? (
            <tr>
              <td colSpan={6} style={styles.empty}>
                No hay establecimientos registrados
              </td>
            </tr>
          ) : (
            establishments.map((est) => (
              <tr key={est.id_establecimiento}>
                <td style={styles.td}>{est.no_expediente}</td>
                <td style={styles.td}>{est.nombre_establecimiento}</td>
                <td style={styles.td}>{est.nombre_propietario}</td>
                <td style={styles.td}>{est.direccion}</td>
                <td style={styles.td}>{est.estatus}</td>

                {/* Botones */}
                <td style={styles.td}>
                  <button style={styles.btn}>Ver</button>
                  <button style={styles.btnEdit}>Editar</button>
                  <button style={styles.btnDelete}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>

   
  );
}

const styles = {
  th: {
    padding: "10px",
    borderBottom: "2px solid #dd0909",
    textAlign: "left" as const
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid #37d732"
  },

  empty: {
    padding: "20px",
    textAlign: "center" as const
  },

  btn: {
    marginRight: "5px",
    padding: "5px 10px"
  },

  btnEdit: {
    marginRight: "5px",
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    border: "none"
  },

  btnDelete: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none"
  }
};