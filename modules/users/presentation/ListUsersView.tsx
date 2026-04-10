"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListaUsuarios() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();

      // agregamos campo seleccionado
      const usuariosConSeleccion = data.map((u) => ({
        ...u,
        seleccionado: false,
      }));

      setUsuarios(usuariosConSeleccion);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const toggleSeleccion = (index: number) => {
    const nuevos = [...usuarios];
    nuevos[index].seleccionado = !nuevos[index].seleccionado;
    setUsuarios(nuevos);
  };

  const filtrados = usuarios.filter((u) =>
    u.username.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-500 p-6">

      <h1 className="text-4xl font-bold text-center mb-6">
        Protección Civil
      </h1>

      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold">Registros</span>

        <div className="flex items-center gap-2 ">
          <span>Buscar Registro</span>
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border-2 border-black p-2 bg-white "
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filtrados.map((user, index) => (
          <div
            key={index}
            className="bg-gray-200 border-2 border-black p-4 flex justify-between items-center"
          >
            <div className="w-full">
              <p className="border-b border-black py-1 text-black">
                Usuario: {user.username}
              </p>
              <p className="border-b border-black py-1 text-black">
                Nombre: {user.nombre}
              </p>
              <p className="py-1 text-black">
                Celular: {user.celular}
              </p>
            </div>

            <div
              onClick={() => toggleSeleccion(index)}
              className={`ml-4 w-6 h-6 border-2 border-black flex items-center justify-center cursor-pointer ${
                user.seleccionado ? "bg-orange-400" : "bg-white"
              }`}
            >
              {user.seleccionado && "✓"}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-10 items-center">
        <button className="border-2 border-black px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black">
          Agregar +
        </button>

        <button className="border-2 border-black px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black">
          Eliminar 🗑
        </button>

        <button className="border-2 border-black px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black">
          Tarifa 💲
        </button>

        <button className="border-2 border-black px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black">
          Calendario 📅
        </button>

        <button className="ml-auto border-2 border-black px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black">
          Editar ✏
        </button>
      </div>
    </div>
  );
}