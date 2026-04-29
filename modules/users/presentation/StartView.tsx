"use client";

import Link from "next/dist/client/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2';

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
      Swal.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: data.error, // Esto mostrará el mensaje que pusiste en el NextResponse.json
      confirmButtonColor: '#005954',
      timer: 3000,
      timerProgressBar: true
      });
      return;
    }

    const Toast = Swal.mixin({
  toast: true,
  position: 'top-end', // Puedes usar 'top', 'center', etc.
  showConfirmButton: false,
  timer: 2000, // Se cierra en 2 segundos
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

Toast.fire({
  icon: 'success',
  title: '¡Bienvenido de nuevo!'
});

// Rediriges después de que se lanza la alerta o con un pequeño delay
setTimeout(() => {
    router.push("/MainMenu");
}, 1500);

  } catch (error) {
    console.error(error);
    alert("Error en la conexión");
  }
};

  return (
    // 1. Fondo: Cambiado de bg-orange-500 a bg-slate-50 (Gris muy claro #F5F5F5)
    <div 
      className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-lato relative overflow-hidden"
      style={{
        backgroundImage: 'url(/img/pleca.png)', 
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 45px', // Tamaño consistente
        backgroundPosition: 'top center',
      }}
    >
      
      {/* 2. Tarjeta Principal con z-10 para estar sobre el fondo */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12 border border-slate-100 w-full max-w-6xl mx-4 relative z-10">
        
        {/* COLUMNA IZQUIERDA: Panel del Logo e Identidad */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-2/5 border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-12">
          {/* Logo Corporativo */}
          <div className="p-2">
            <Image
              src="/img/Pcblogo.png"
              alt="Logo Protección Civil"
              width={180}
              height={180}
              priority
              className="object-contain"
            />
          </div>

          {/* Texto de Identidad */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-teal-700 tracking-tight leading-tight uppercase">
              PROTECCIÓN CIVIL
            </p>
            <p className="text-2xl font-semibold text-orange-600 leading-tight uppercase">
              Y BOMBEROS
            </p>
            <p className="text-lg font-normal text-slate-900 pt-2 border-t border-slate-50 mt-4">
              IZÚCAR DE MATAMOROS, PUE.
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario de Login */}
        <div className="flex-grow w-full max-w-md bg-slate-50/50 p-8 md:p-10 rounded-2xl border border-slate-100">
          
          <UserIcon />

          <h1 className="text-3xl font-extrabold text-slate-950 text-center mb-8 tracking-tight">
            Acceso al Sistema
          </h1>

          <div className="space-y-5">
            {/* Campo Usuario */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 ml-1">
                Nombre de Usuario
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej: oficial_izucar"
                className="block w-full px-4 py-3 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm outline-none transition-all"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 ml-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-4 py-3 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm outline-none transition-all"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-4 text-xl font-bold bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition duration-300 shadow-lg shadow-teal-700/20 active:scale-[0.98] mt-6"
            >
              Iniciar Sesión
            </button>

            <p className="text-center text-slate-600 pt-6 text-sm">
              ¿Eres un usuario nuevo?{' '}
              <Link href="/users/register" className="text-teal-700 font-bold hover:text-teal-900 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}