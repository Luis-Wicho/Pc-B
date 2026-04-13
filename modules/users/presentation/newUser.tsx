"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Importamos Image para el logo corporativo
import Link from "next/link"; // Importamos Link para mejor navegación

export default function NewUsers() {
  const router = useRouter();

  // Tipado estricto para TypeScript (opcional pero recomendado)
  const [formData, setFormData] = useState({
    username: "",
    nombres: "",
    apellidos: "",
    celular: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del usuario:", formData);
    alert("Usuario registrado correctamente");
  };

  return (
    // 1. Fondo: Cambiado de bg-orange-500 a bg-slate-50 (Gris muy claro #F5F5F5) para limpieza
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-lato">
      
      {/* 2. Tarjeta del Formulario: Añadida sombra sutil, bordes redondeados y fondo blanco */}
      <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-2xl mx-4 border border-slate-100">
        
        {/* Cabecera Estilizada Integrando el Logo y Textos Corporativos */}
        <div className="text-center mb-12 border-b border-slate-100 pb-10 flex flex-col items-center">
          
          {/* Sección del Logo Corporativo */}
          <div className="p-2 mb-4">
            <Image
              src="/img/Pcblogo.png" // Ruta de tu logo
              alt="Logo Protección Civil y Bomberos Izúcar"
              width={160} // Ligeramente más pequeño para mejor balance
              height={160}
              priority
            />
          </div>

          {/* Sección de Identidad de Marca: Estilizado con los colores corporativos */}
          <div className="space-y-1">
            {/* 'PROTECCIÓN CIVIL' en Teal Primario #1E838F */}
            <p className="text-3xl font-bold text-teal-700 tracking-tight leading-tight">
              PROTECCIÓN CIVIL
            </p>
            {/* 'Y BOMBEROS' en Naranja de Acento #E8702D */}
            <p className="text-2xl font-semibold text-orange-600 leading-tight">
              Y BOMBEROS
            </p>
            {/* Ubicación en Gris Oscuro #1D1D1B */}
            <p className="text-lg font-normal text-slate-900 pt-1">
              IZÚCAR DE MATAMOROS, PUE.
            </p>
          </div>
        </div>

        {/* Título del Formulario */}
        <h1 className="text-2xl font-bold text-slate-950 mb-8 tracking-tight">
          Registro de Usuarios Nuevos
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nombre de Usuario (Ocupa todo el ancho) */}
          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-medium ml-1 text-sm">
              Nombre de Usuario o Correo Electrónico *
            </label>
            <input
              type="text"
              name="username"
              required
              onChange={handleChange}
              placeholder="Ej: usuario123 o correo@dominio.com"
              // Inputs: Estilizados con bordes sutiles y focus Teal
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
            />
          </div>

          {/* Fila: Nombres y Apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 font-medium ml-1 text-sm">
                Nombres *
              </label>
              <input
                type="text"
                name="nombres"
                required
                onChange={handleChange}
                placeholder="Tus nombres"
                className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 font-medium ml-1 text-sm">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                onChange={handleChange}
                placeholder="Tus apellidos"
                className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Celular */}
          <div className="flex flex-col space-y-2">
            <label className="text-slate-700 font-medium ml-1 text-sm">
              Teléfono Celular
            </label>
            <input
              type="tel"
              name="celular"
              onChange={handleChange}
              placeholder="10 dígitos (Ej: 2441234567)"
              className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
            />
          </div>

          {/* Fila: Contraseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 font-medium ml-1 text-sm">
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-slate-700 font-medium ml-1 text-sm">
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Botón Principal: Estilizado en Teal (#1E838F) */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition duration-300 shadow-md shadow-teal-700/20 active:scale-95 text-xl"
            >
              Registrar Cuenta de Usuario
            </button>
            <Link href="/users" 
              className="font-semibold text-orange-600 hover:text-orange-700 hover:underline transition"
            >
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}