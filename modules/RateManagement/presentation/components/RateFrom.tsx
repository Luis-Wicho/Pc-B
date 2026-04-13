"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Icono SVG profesional para la cabecera del formulario (Teal primario #1E838F)
const RatesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-teal-700 bg-teal-100 p-3 rounded-full mb-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

// Icono SVG para el input de Monto (Dólar/Peso)
const CurrencyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

// Definición de tipos para TypeScript (opcional pero recomendado)
// type RateSubmitData = {
//   id: number;
//   name: string;
//   amount: number;
//   status: "ACTIVE" | "INACTIVE";
// };

// type RatesFormProps = {
//   onSubmit: (data: RateSubmitData) => void;
// };

export default function RatesForm({ onSubmit }) {
  const router = useRouter();
    
  // Estados con tipado estricto
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(""); // Usamos string vacío para mejor UX en el input

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica: asegura que el nombre no esté vacío y el monto sea un número válido
    if (!name.trim() || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Por favor, ingrese un nombre válido y un monto mayor a cero.");
      return;
    }

    // Componemos el objeto de retorno tal como lo solicitaste, pero con datos reales
    onSubmit({
      id: 0, // Generalmente manejado por la base de datos tras la inserción
      name: name.trim(),
      amount: Number(amount),
      status: "ACTIVE", // Estatus predeterminado
    });

    // Opcional: limpiar el formulario tras envío exitoso
    // setName("");
    // setAmount("");
  };

  return (
    // 1. Fondo general: bg-slate-50 (Gris muy claro #F5F5F5) para limpieza
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-lato">
      
      {/* 2. Tarjeta del Formulario: Añadida sombra sutil, bordes redondeados y fondo blanco */}
      <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-2xl mx-4 border border-slate-100">
        
        {/* Cabecera Estilizada */}
        <div className="text-center mb-12 border-b border-slate-100 pb-8">
          <RatesIcon />
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Crear Nueva Tarifa</h1>
          <p className="text-slate-600 text-lg mt-2">Defina los parámetros para Protección Civil Izúcar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Campo Nombre de Tarifa (Ocupa todo el ancho) */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-slate-700 font-medium ml-1 text-sm">
              Nombre de la Tarifa *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Licencia Comercial Anual"
              // Inputs: Estilizados con bordes sutiles y focus Teal
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Campo Monto Dinámico */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="amount" className="text-slate-700 font-medium ml-1 text-sm">
              Monto (MXN) *
            </label>
            {/* Contenedor del Input con Icono integrado */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-teal-700">
                <CurrencyIcon />
              </div>
              <input
                id="amount"
                type="number"
                name="amount"
                required
                step="0.01" // Permite decimales para precisión
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Guardamos como string para no obligar a poner '0'
                placeholder="0.00"
                // Inputs: Estilizados con bordes sutiles y focus Teal
                className="pl-12 pr-4 py-3 w-full text-xl font-semibold border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400 transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">Ingrese el monto total en pesos mexicanos.</p>
          </div>

          {/* Botón Principal: Cambiado de bg-gray-300 a bg-teal-700 (#1E838F) */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition duration-300 shadow-md shadow-teal-700/20 active:scale-95 text-xl flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              Guardar Tarifa
            </button>
          </div>

        </form>

        {/* Enlace de Navegación / Pie de tarjeta sutil */}
        <div className="mt-10 text-center border-t border-slate-100 pt-8">
          <p className="text-slate-600 text-base">
            ¿Necesitas revisar las tarifas existentes?{" "}
            <a 
              href="/tarifas" 
              className="font-semibold text-orange-600 hover:text-orange-700 hover:underline transition"
            >
              Volver a la Lista
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}