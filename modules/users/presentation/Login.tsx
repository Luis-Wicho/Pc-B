"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// Definición de la paleta de colores del estilo elegido para referencia en Tailwind
// Primario (Teal): #1E838F (text-teal-700, bg-teal-700)
// Acento (Naranja): #E8702D (text-orange-600)
// Texto Oscuro: #1D1D1B (text-slate-900)
// Fondo: #F5F5F5 (bg-slate-50)

export default function Login() {
  const router = useRouter();

  return (
    // 1. Fondo: Cambiado de bg-orange-500 a bg-slate-50 (Gris muy claro #F5F5F5)
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-lato">
      
      {/* 2. Contenedor Principal: Añadido fondo blanco, bordes redondeados y sombra sutil */}
      <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-100 text-center w-full max-w-md mx-4">

        {/* Sección del Logo e Identidad */}
        <div className="flex flex-col items-center mb-10">
          
          {/* Logo: Mantenemos tu imagen */}
          <div className="p-2 mb-4">
            <Image
              src="/img/Pcblogo.png"
              alt="Logo Protección Civil y Bomberos Izúcar"
              width={160} // Ligeramente más pequeño para mejor balance
              height={160}
              priority
            />
          </div>

          {/* Texto de Identidad: Estilizado con los colores correctos */}
          <div className="space-y-1">
            {/* 'PROTECCIÓN CIVIL' en Teal Primario #1E838F */}
            <p className="text-2xl font-bold text-teal-700 tracking-tight leading-tight">
              PROTECCIÓN CIVIL
            </p>
            {/* 'Y BOMBEROS' en Naranja de Acento #E8702D */}
            <p className="text-xl font-semibold text-orange-600 leading-tight">
              Y BOMBEROS
            </p>
            {/* Ubicación en Gris Oscuro #1D1D1B */}
            <p className="text-base font-normal text-slate-900 pt-1">
              IZÚCAR DE MATAMOROS, PUE.
            </p>
          </div>
        </div>

        {/* Sección de Acciones */}
        <div className="space-y-4">
          
          {/* Botón Inicio de Sesión: Cambiado de bg-gray-800 a bg-teal-700 (#1E838F) */}
          <button
            className="block w-full py-4 text-lg font-semibold bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition duration-300 shadow-md shadow-teal-700/20 active:scale-95"
            onClick={() => router.push("/users/start")}
          >
            Iniciar Sesión
          </button>

          {/* Botón Registrar: Estilo Secundario (Outline) usando Teal */}
          <button
            className="block w-full py-4 text-lg font-medium bg-white text-teal-700 border-2 border-teal-700 rounded-xl hover:bg-teal-50 transition duration-300 active:scale-95"
            onClick={() => router.push("/users/register")}
          >
            Crear Cuenta
          </button>

          {/* Ayuda: Enlace sutil en Gris Medio */}
          <p className="text-sm text-slate-500 pt-4 hover:text-orange-600 transition cursor-pointer">
            ¿Necesitas ayuda con tu acceso?
          </p>
        </div>

      </div>
    </div>
  );
}