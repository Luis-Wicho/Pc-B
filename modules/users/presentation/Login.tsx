
"use client";

import Image from "next/image";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500">
      
      <div className="text-center">

        {/* Logo */}
        <div className="p-4 mb-6 flex flex-col items-center">
  
  <Image
    src="/img/Pcblogo.png"
    alt="Logo"
    width={190}
    height={190}
  />

  {/* Texto debajo del logo */}
  <p className="mt-4 text-center text-xl font-semibold text-gray-800 leading-tight">
    PROTECCIÓN CIVIL<br />
    Y BOMBEROS<br />
    IZÚCAR DE MATAMOROS
  </p>

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