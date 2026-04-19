"use client";

import Link from "next/dist/client/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Icono de usuario SVG actualizado con los colores de la paleta
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    // text-teal-700 (#1E838F) para el icono de usuario
    className="w-20 h-20 mx-auto text-teal-700 mb-8 border-4 border-teal-100 rounded-full p-3 bg-teal-50"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function StartView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
  try {
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_usuario: email,
        contrasena: password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al iniciar sesión");
      return;
    }

    alert("Login correcto ✅");
    router.push("/MainMenu");

  } catch (error) {
    console.error(error);
    alert("Error en la conexión");
  }
};

  return (
    // 1. Fondo: Cambiado de bg-orange-500 a bg-slate-50 (Gris muy claro #F5F5F5)
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-lato">
      
      {/* 2. Tarjeta Principal: Añadida sombra sutil, bordes redondeados y fondo blanco */}
      <div className="bg-white p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12 border border-slate-100 w-full max-w-6xl mx-4">
        
        {/* COLUMNA IZQUIERDA: Panel del Logo e Identidad */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-1/3">
          {/* Logo */}
          <div className="p-2">
            <div className="p-2 mb-4">
                       <Image
                         src="/img/Pcblogo.png"
                         alt="Logo Protección Civil y Bomberos Izúcar"
                         width={160} // Ligeramente más pequeño para mejor balance
                         height={160}
                         priority
                       />
                     </div>
          </div>

          {/* Texto de Identidad */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-teal-700 tracking-tight leading-tight">
              PROTECCIÓN CIVIL
            </p>
            <p className="text-2xl font-semibold text-orange-600 leading-tight">
              Y BOMBEROS
            </p>
            <p className="text-lg font-normal text-slate-900 pt-2">
              IZÚCAR DE MATAMOROS, PUE.
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario */}
        <div className="flex-grow w-full max-w-lg bg-white p-10 rounded-2xl shadow-inner border border-slate-100">
          
          {/* Icono de Persona */}
          <UserIcon />

          {/* Título del Formulario */}
          <h1 className="text-3xl font-extrabold text-slate-950 text-center mb-10 tracking-tight">
            Iniciar Sesión
          </h1>

          {/* Formulario */}
          <div className="space-y-6">
            
            {/* Campo Correo / Usuario */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Nombre de Usuario
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ejemplo23"
                // Inputs: Estilizados con bordes sutiles y focus Teal
                className="block w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                // Inputs: Estilizados con bordes sutiles y focus Teal
                className="block w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
              />
            </div>

            {/* Ayuda: Enlace sutil en Naranja */}
            <p className="text-sm text-right text-orange-600 hover:text-orange-700 transition cursor-pointer">
              ¿Olvidaste tu contraseña?
            </p>

            <div>
            {/* Botón Guardar / Iniciar Sesión: Cambiado de bg-gray-900 a bg-teal-700 (#1E838F) */}
            <button
              onClick={handleSave}
              className="block w-full mt-10 py-4 text-xl font-bold bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition duration-300 shadow-md shadow-teal-700/20 active:scale-95"
            >
              Iniciar Sesión
            </button>
            <Link href="MainMenu"/>
            </div>

            {/* Registrar: Enlace sutil al final */}
            <p className="text-center text-slate-600 pt-6">
              ¿Eres un usuario nuevo?{' '}
              <span className="font-semibold text-teal-700 hover:text-teal-900 cursor-pointer">
                Registrar
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}