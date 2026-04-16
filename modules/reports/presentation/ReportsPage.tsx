"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ReportData {
  totalEstablecimientos: number;
  totalUsuarios: number;
  totalIngresos: number;
  actividades: number;
}

export default function ReportsPage() {

  const [data, setData] = useState<ReportData>({
    totalEstablecimientos: 0,
    totalUsuarios: 0,
    totalIngresos: 0,
    actividades: 0
  });

  // Simulación de carga de datos 
  const loadReports = async () => {
    // Aquí iría tu conexión real (use case)
    const fakeData = {
      totalEstablecimientos: 25,
      totalUsuarios: 10,
      totalIngresos: 15000,
      actividades: 8
    };

    setData(fakeData);
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Reportes del Sistema</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={cardStyle}>
          <h3>Establecimientos</h3>
          <p>{data.totalEstablecimientos}</p>
        </div>

        <div style={cardStyle}>
          <h3>Usuarios</h3>
          <p>{data.totalUsuarios}</p>
        </div>

        <div style={cardStyle}>
          <h3>Ingresos</h3>
          <p>${data.totalIngresos}</p>
        </div>

        <div style={cardStyle}>
          <h3>Actividades</h3>
          <p>{data.actividades}</p>
        </div>

      </div>

      <h2 style={{ marginTop: "40px" }}>Detalle de Actividades</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inspección</td>
            <td>2026-04-15</td>
            <td>Revisión de seguridad</td>
          </tr>
          <tr>
            <td>Reunión</td>
            <td>2026-04-16</td>
            <td>Planeación mensual</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// 🎨 estilos básicos
const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "20px",
  borderCollapse: "collapse"
};