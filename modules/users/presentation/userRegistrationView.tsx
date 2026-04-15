"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-lato">
      <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-3xl mx-4 border border-slate-100">
        
        <div className="text-center mb-12">
          <UserAddIcon />
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Crear Cuenta
          </h1>
          <p className="text-slate-600 mt-3 text-lg">
            Ingresa tus datos para registrar tu establecimiento
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="Usuario o correo"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="text"
            name="nombres"
            required
            value={formData.nombres}
            onChange={handleChange}
            placeholder="Nombres"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="text"
            name="apellidos"
            required
            value={formData.apellidos}
            onChange={handleChange}
            placeholder="Apellidos"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar contraseña"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button className="w-full py-3 bg-teal-700 text-white rounded-xl">
            Registrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/users/start">Inicia sesión</Link>
        </div>

      </div>
    </div>
  );
}