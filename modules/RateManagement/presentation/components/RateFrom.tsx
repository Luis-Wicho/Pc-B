"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RatesFrom() {
  const router = useRouter();
  const [rates, setRates] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // 🔹 Obtener datos de Supabase
  const fetchRates = async () => {
    const { data, error } = await supabase
      .from("rates")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setRates(data);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // 🔹 Filtrado (search)
  const filteredRates = rates.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-500 p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-black mb-4">
        Protección Civil - Tarifas
      </h1>

      {/* 🔍 Buscador */}
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 rounded-full border w-72"
      />

      {/* 📊 Tabla */}
      <div className="bg-white border-2 border-black overflow-auto max-h-[300px]">
        <table className="w-full text-center border-collapse">
          <thead className="bg-blue-300">
            <tr>
              <th className="border p-2">Establecimiento</th>
              <th className="border p-2">No Expediente</th>
              <th className="border p-2">Tarifa</th>
              <th className="border p-2">Seleccionar</th>
            </tr>
          </thead>

          <tbody>
            {filteredRates.map((r) => (
              <tr key={r.id} className="bg-gray-200">
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.file_number}</td>
                <td className="border p-2">${r.amount}</td>
                <td className="border p-2">
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔘 Botones */}
      <div className="flex justify-between mt-6">
        
        <button className="bg-white border px-4 py-2 shadow">
          Modificar
        </button>

        <button className="bg-white border px-4 py-2 shadow">
          Orden de Pago
        </button>

        <button className="bg-white border px-4 py-2 shadow">
          🗑 Borrar
        </button>
      </div>

      <div className="mt-6">
        <button className="bg-white border px-4 py-2 shadow">
          Regresar
        </button>
      </div>

    </div>
  );
}