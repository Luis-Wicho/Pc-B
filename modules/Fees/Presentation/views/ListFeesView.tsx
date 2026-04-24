"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fee } from "../../domain/fee.entity";
import { FeesRepositoryImpl } from "../../infrastructure/FeesRepositoryImpl";
import { GetFeesUseCase } from "../../Application/getFees.usecase";
import { DeleteFeeUseCase } from "../../Application/deleteFee.usecase";

export default function ListFeesView() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);

  const repository = new FeesRepositoryImpl();
  const getFeesUseCase = new GetFeesUseCase(repository);
  const deleteFeeUseCase = new DeleteFeeUseCase(repository);

  const fetchFees = async () => {
    setLoading(true);
    const data = await getFeesUseCase.execute();
    setFees(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar esta tarifa? Esta acción es irreversible.");
    
    if (confirmDelete) {
      const success = await deleteFeeUseCase.execute(id);
      if (success) {
        alert("Tarifa eliminada exitosamente.");
        fetchFees();
      } else {
        alert("Error al eliminar la tarifa.");
      }
    }
  };

  if (loading) return <div className="p-4 text-center">Cargando tarifas...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Tarifas</h1>
        
        <Link href="/Fees/register">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow">
            + Registrar Nueva Tarifa
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descripción</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monto</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {fees.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-5 text-center text-gray-500">No hay tarifas registradas.</td>
              </tr>
            ) : (
              fees.map((fee) => (
                <tr key={fee.id}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">{fee.id}</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm font-medium">{fee.nombre}</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-500">{fee.descripcion || "Sin descripción"}</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm font-bold">${fee.monto.toFixed(2)}</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-center space-x-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded shadow text-xs">Modificar</button>
                    <button onClick={() => handleDelete(fee.id)} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded shadow text-xs">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}