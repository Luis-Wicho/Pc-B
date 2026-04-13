"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icono de usuario SVG actualizado con los colores de la paleta
const UserAddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    // text-teal-700 (#1E838F) para el icono
    className="w-16 h-16 mx-auto text-teal-700 mb-6 border-4 border-teal-100 rounded-full p-3 bg-teal-50"
  >
    <path d="M6.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM3.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM19.75 7.5a.75.75 0 0 0-1.5 0v2.25H16a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H22a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
  </svg>
);

export default function UserRegistrationView() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    nombres: "",
    apellidos: "",
    celular: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Validación básica de contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos del usuario:", formData);
    alert("Usuario registrado correctamente");
    // router.push("/users/start"); // Navegar al login tras registro exitoso
  };

  return (
    // 1. Fondo: Cambiado de bg-orange-500 a bg-slate-50 (Gris muy claro #F5F5F5)
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-lato">
      
      {/* 2. Tarjeta Principal: Añadida sombra sutil, bordes redondeados y fondo blanco */}
      <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-3xl mx-4 border border-slate-100">
        
        {/* Cabecera del Formulario con Icono */}
        <div className="text-center mb-12">
          <UserAddIcon />
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Crear Cuenta
          </h1>
          <p className="text-slate-600 mt-3 text-lg">
            Ingresa tus datos para registrar tu establecimiento
          </p>
        </div>

        {/* Formulario */}
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
              value={formData.username}
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
                value={formData.nombres}
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
                value={formData.apellidos}
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
              value={formData.celular}
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
                value={formData.password}
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
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-lg border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 text-slate-950 shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Botón de acción: Cambiado de bg-gray-900 a bg-teal-700 (#1E838F) */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition duration-300 shadow-md shadow-teal-700/20 active:scale-95 text-xl"
            >
              Registrar Cuenta
            </button>
          </div>

        </form>

        {/* Enlace de navegación / Pie de tarjeta */}
        <div className="mt-10 text-center border-t border-slate-100 pt-8">
          <p className="text-slate-600 text-base">
            ¿Ya tienes una cuenta registrada?{" "}
            <Link 
              href="/users/start" 
              className="font-semibold text-teal-700 hover:text-teal-900 hover:underline transition"
              // onClick={() => router.push("/users/start")} // Link href es preferible
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}