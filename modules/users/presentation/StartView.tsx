"use client";

import Image from "next/image";
import { useState } from "react";

// Icono de usuario SVG simple
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-16 h-16 mx-auto text-gray-800 mb-6"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function StartView() {
  // Estados para capturar los datos (opcional, pero buena práctica)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Aquí iría la lógica para guardar/enviar los datos
    console.log("Datos a guardar:", { email, password });
    alert(`Guardando:\nCorreo: ${email}\n(Contraseña oculta)`);
  };

  return (
    // Contenedor principal centrado
    <div className="flex items-center justify-center min-h-screen bg-orange-500 p-4">
      
      {/* Tarjeta de Login - Estructura de dos columnas en pantallas medianas+ */}
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-10 backdrop-blur-sm">
        
        {/* COLUMNA IZQUIERDA: Panel del Logo */}
        <div className="flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-lg flex justify-center items-center">
            <Image
              src="/img/logo_pcb.png" // Asegúrate de que esta ruta sea correcta en tu carpeta /public
              alt="Logo PCB"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario */}
        <div className="flex-grow w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          
          {/* Icono de Persona */}
          <UserIcon />

          {/* Formulario */}
          <div className="space-y-6">
            
            {/* Campo Correo */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="block w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 shadow-sm"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 shadow-sm"
              />
            </div>

            {/* Botón Guardar */}
            <button
              onClick={handleSave}
              className="block w-full mt-8 py-4 text-xl font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition duration-150 active:scale-[0.98] shadow-md"
            >
              Guardar
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}