
"use client";

import Image from "next/image";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500">
      
      <div className="text-center">

        {/* Logo */}
        <div className="bg-white rounded-lg p-4 mb-6 flex justify-center">
          <Image
           src="/img/logo_pcb.png" // cambia por tu imagen
            alt="Logo"
            width={190}
            height={190}
          />
        </div>

        {/* Botón Inicio de sesión */}
        <button
          className="block w-72 mx-auto mb-4 py-4 text-lg bg-gray-800 text-white rounded-md hover:bg-gray-600 transition"
          onClick={() => alert("Ir a iniciar sesión")}
        >
          Inicio de sesión
        </button>

        {/* Botón Registrar */}
        <button
          className="block w-72 mx-auto mb-4 py-4 text-lg bg-gray-800 text-white rounded-md hover:bg-gray-600 transition"
          onClick={() => alert("Ir a registro")}
        >
          Registrar
        </button>

      </div>
    </div>
  );
}