"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ListoEstablishmentsView() {
  const router = useRouter();
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerEstablecimientos = async () => {
      const res = await fetch("/api/Establishments");
      const data = await res.json();

      if (!data.error) {
        setEstablecimientos(data);
      } else {
        alert(data.error);
      }
    };

    obtenerEstablecimientos();
  }, []);

  const establecimientosFiltrados = establecimientos.filter((e: any) =>
    e.nombre_establecimiento.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-lato">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-100 p-8">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/img/Pcblogo.png"
            alt="Logo"
            width={120}
            height={80}
          />

          <h1 className="text-3xl font-bold text-teal-700 mt-3">
            Lista de Establecimientos
          </h1>
        </div>

        {/* BUSCADOR + BOTÓN */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <input
            type="text"
            placeholder="Buscar establecimiento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-700"
          />

          <button
            onClick={() => router.push("/Establishments/register")}
            className="px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition shadow-md shadow-teal-700/20 active:scale-95"
          >
            + Registrar
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">

            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-3 text-left">Expediente</th>
                <th className="p-3 text-left">Establecimiento</th>
                <th className="p-3 text-left">Propietario</th>
                <th className="p-3 text-left">Dirección</th>
                <th className="p-3 text-left">Estatus</th>
                <th className="p-3 text-left">Giro</th>
                <th className="p-3 text-left">Tamaño</th>
                <th className="p-3 text-left">Oficio</th>
                <th className="p-3 text-left">Acción</th>
              </tr>
            </thead>

            <tbody>
              {establecimientosFiltrados.map((e: any, index: number) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-3">{e.no_expediente}</td>
                  <td className="p-3">{e.nombre_establecimiento}</td>
                  <td className="p-3">{e.nombre_propietario}</td>
                  <td className="p-3">{e.direccion}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        e.estatus === "Activo"
                          ? "bg-green-100 text-green-700"
                          : e.estatus === "Pendi"
                          ? "bg-yellow-100 text-yellow-700"
                          : e.estatus === "Inactiv"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {e.estatus}
                    </span>
                  </td>

                  <td className="p-3">{e.giro}</td>
                  <td className="p-3">{e.tama}</td>
                  <td className="p-3">{e.no_oficio}</td>

                  <td className="p-3">
                    <button className="px-3 py-1 bg-teal-700 text-white rounded-lg text-xs hover:bg-teal-800 transition">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* PAGINACIÓN */}
        <div className="flex justify-center mt-6 gap-2 text-sm">
          <span className="px-3 py-1 rounded-lg cursor-pointer hover:bg-slate-200">«</span>
          <span className="px-3 py-1 bg-teal-700 text-white rounded-lg">1</span>
          <span className="px-3 py-1 cursor-pointer hover:bg-slate-200">2</span>
          <span className="px-3 py-1 cursor-pointer hover:bg-slate-200">3</span>
          <span className="px-3 py-1 cursor-pointer hover:bg-slate-200">»</span>
        </div>

      </div>
    </div>
  );
}