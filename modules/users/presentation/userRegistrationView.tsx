"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserAddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
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
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Validación
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // ✅ Separar apellidos
    const apellidosArray = formData.apellidos.trim().split(" ");

    const usuario = {
      nombre_usuario: formData.username,
      nombre: formData.nombres,
      apellido_paterno: apellidosArray[0] || "",
      apellido_materno: apellidosArray[1] || "",
      contrasena: formData.password,
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar");
        return;
      }

      alert("Usuario registrado correctamente");
      router.push("/users/start");

    } catch (error) {
      console.error(error);
      alert("Error en la conexión");
    }
  };

  return (
    <div 
  className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-lato relative overflow-hidden"
  style={{
    backgroundImage: 'url(/img/pleca.png)', 
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 40px', // Tamaño de la pleca igual que en los anteriores
    backgroundPosition: 'top center',
  }}
>
  
  {/* Tarjeta del Formulario */}
  <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-3xl mx-4 border border-slate-100 relative z-10">
    
    {/* Cabecera con Identidad Corporativa (Logo y Textos) */}
    <div className="text-center mb-10 flex flex-col items-center">
      <div className="p-2 mb-4">
        <Image
          src="/img/Pcblogo.png"
          alt="Logo Protección Civil"
          width={150}
          height={150}
          priority
        />
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold text-teal-700 tracking-tight leading-tight uppercase">
          Protección Civil
        </p>
        <p className="text-xl font-semibold text-orange-600 leading-tight uppercase">
          y Bomberos
        </p>
        <p className="text-sm font-normal text-slate-900">
          IZÚCAR DE MATAMOROS, PUE.
        </p>
      </div>
      
      {/* Separador visual sutil */}
      <div className="w-full border-b border-slate-100 mt-8 mb-6"></div>

      <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
        Crear Cuenta
      </h1>
      <p className="text-slate-600 mt-2 text-base">
        Ingresa tus datos para registrar tu cuenta
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Input: Usuario */}
      <div className="flex flex-col space-y-1">
        <label className="text-slate-700 font-medium text-sm ml-1">Usuario</label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          placeholder="Ej: usuario123"
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 outline-none transition"
        />
      </div>

      {/* Grid: Nombres y Apellidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-slate-700 font-medium text-sm ml-1">Nombres</label>
          <input
            type="text"
            name="nombres"
            required
            value={formData.nombres}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 outline-none"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-slate-700 font-medium text-sm ml-1">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            required
            value={formData.apellidos}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 outline-none"
          />
        </div>
      </div>

      {/* Grid: Contraseñas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-slate-700 font-medium text-sm ml-1">Contraseña</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 outline-none"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-slate-700 font-medium text-sm ml-1">Confirmar</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-700 outline-none"
          />
        </div>
      </div>

      <button className="w-full py-4 bg-teal-700 text-white rounded-xl font-bold text-lg hover:bg-teal-800 transition duration-300 shadow-lg shadow-teal-700/20 active:scale-[0.98] mt-4">
        Registrar
      </button>
    </form>

    <div className="mt-8 text-center border-t border-slate-50 pt-6">
      <p className="text-slate-600">
        ¿Ya tienes cuenta?{' '}
        <Link href="/users/start" className="text-orange-600 font-bold hover:text-orange-700 transition">
          Inicia sesión aquí
        </Link>
      </p>
    </div>

  </div>
</div>
  );
}