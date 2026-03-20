"use client";

import { useState } from "react";
import Link from "next/link";

export default function UserRegistrationView() {
  const [formData, setFormData] = useState({
    username: "",
    nombres: "",
    apellidos: "",
    celular: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica de contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos del usuario:", formData);
    alert("Usuario registrado correctamente");
  };

  

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-orange-500 p-4">
      {/* Tarjeta contenedora con efecto Glassmorphism */}
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/30">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            Crear Cuenta
          </h1>
          <p className="text-orange-100 mt-2">Ingresa tus datos para registrarte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Nombre de Usuario (Ocupa todo el ancho) */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-1 ml-1 text-sm">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              required
              onChange={handleChange}
              placeholder="Ej: usuario123"
              className="w-full p-3 rounded-xl border-none focus:ring-4 focus:ring-orange-300 outline-none text-gray-800 shadow-inner"
            />
          </div>

          {/* Fila: Nombres y Apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-1 ml-1 text-sm">Nombres *</label>
              <input
                type="text"
                name="nombres"
                required
                onChange={handleChange}
                className="p-3 rounded-xl border-none focus:ring-4 focus:ring-orange-300 outline-none text-gray-800 shadow-inner"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-1 ml-1 text-sm">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                onChange={handleChange}
                className="p-3 rounded-xl border-none focus:ring-4 focus:ring-orange-300 outline-none text-gray-800 shadow-inner"
              />
            </div>
          </div>

          {/* Celular */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-1 ml-1 text-sm">Celular</label>
            <input
              type="tel"
              name="celular"
              onChange={handleChange}
              placeholder="10 dígitos"
              className="w-full p-3 rounded-xl border-none focus:ring-4 focus:ring-orange-300 outline-none text-gray-800 shadow-inner"
            />
          </div>

          {/* Fila: Contraseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-1 ml-1 text-sm">Contraseña *</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="p-3 rounded-xl border-none focus:ring-4 focus:ring-orange-300 outline-none text-gray-800 shadow-inner"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-1 ml-1 text-sm">Confirmar Contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                required
                onChange={handleChange}
                className="p-3 rounded-xl border-none focus:ring-4 focus:ring-orange-300 outline-none text-gray-800 shadow-inner"
              />
            </div>
          </div>

          {/* Botón de acción */}
          <button
            type="submit"
            className="w-full mt-4 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all transform active:scale-95 shadow-lg text-lg"
          >
            Registrar 
          </button>

        </form>

        {/* Enlace de navegación */}
        <div className="mt-8 text-center border-t border-white/20 pt-6">
          <p className="text-white text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-bold hover:underline text-gray-900">
              Inicia sesión aquí
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}