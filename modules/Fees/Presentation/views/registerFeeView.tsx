"use client";

import React, { useState } from "react";
// Si usas Next.js router para regresar a la lista
import { useRouter } from "next/navigation"; 
import { FeesRepositoryImpl } from "../../infrastructure/FeesRepositoryImpl";
import { CreateFeeUseCase } from "../../application/createFee.usecase";
import { GetFeesUseCase } from "../../application/getFees.usecase";

export default function RegisterFeeView() {
  const router = useRouter();
  
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState<number | "">("");
  
  // Estados de la interfaz
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicialización de casos de uso
  const repository = new FeesRepositoryImpl();
  const createFeeUseCase = new CreateFeeUseCase(repository);
  const getFeesUseCase = new GetFeesUseCase(repository);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Validaciones básicas
      if (!nombre.trim() || monto === "" || Number(monto) <= 0) {
        setError("Por favor, ingresa un nombre válido y un monto mayor a 0.");
        setLoading(false);
        return;
      }

      // 2. REQ13: Verificar que la tarifa no exista previamente
      const tarifasExistentes = await getFeesUseCase.execute();
      const tarifaDuplicada = tarifasExistentes.find(
        (t) => t.nombre.toLowerCase() === nombre.trim().toLowerCase()
      );

      if (tarifaDuplicada) {
        setError("Ya existe una tarifa registrada con este nombre. Por favor, utiliza otro.");
        setLoading(false);
        return;
      }

      // 3. Registrar la nueva tarifa
      const nuevaTarifa = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        monto: Number(monto),
      };

      const resultado = await createFeeUseCase.execute(nuevaTarifa);

      if (resultado) {
        alert("Tarifa registrada exitosamente.");
        router.push("/Fees"); // Redirigimos de vuelta a la tabla
      } else {
        setError("Ocurrió un error al guardar en la base de datos. Intenta nuevamente.");
      }
    } catch (err) {
      setError("Error inesperado en el sistema.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registrar Nueva Tarifa</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre de la Tarifa
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ej. Inspección de riesgo bajo"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción (Opcional)
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Detalles sobre qué incluye esta tarifa..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
            Monto ($)
          </label>
          <input
            id="monto"
            type="number"
            step="0.01"
            min="0.01"
            value={monto}
            onChange={(e) => setMonto(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex items-center justify-end pt-4 space-x-3">
          <button
            type="button"
            onClick={() => router.push("/Fees")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
          >
            Cancelar
          </button>
          
          {/* Botón Verde para el registro */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none shadow ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Guardando..." : "Registrar Tarifa"}
          </button>
        </div>
      </form>
    </div>
  );
}