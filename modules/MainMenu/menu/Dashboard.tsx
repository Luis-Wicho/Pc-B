"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"; // Para el logo corporativo
import { title } from "process";

export default function Dashboard() {
  const router = useRouter();

  // Definimos las opciones de navegación, ahora sin la propiedad de color
  const opciones = [
    {
      titulo: "Usuarios",
      icono: "👥",
      ruta: "/users",
    },
    {
      titulo: "Establecimientos",
      icono: "🏪",
      ruta: "/Establishments",
    },
    {
      titulo: "Tarifas",
      icono: "💲",
      ruta: "/rates",
    },
    {
      titulo: "Reportes",
      icono: "📊",
      ruta: "/Reports/panelReports",
    },
    {
      titulo: "Documentos",
       icono: "🗂️",
       ruta: "/Documents",
    },
    
    // Añadimos una opción extra para que el sidebar se vea completo
    {
      titulo: "Configuración",
      icono: "⚙️",
      ruta: "/settings",
    },
  ];

  return (
    // 1. Fondo general: Cambiado a bg-slate-50 (Gris muy claro #F5F5F5) para limpieza
    <div className="min-h-screen bg-slate-50 flex font-lato">
      
      {/* 2. BARRA LATERAL IZQUIERDA: Fija, con fondo Teal primario #1E838F */}
      <aside className="w-64 bg-teal-700 text-white flex flex-col p-6 shadow-xl space-y-10 border-r border-teal-800 rounded-r-3xl my-6 ml-6">
        
        {/* Sección del Logo Corporativo */}
        <div className="flex flex-col items-center mb-8">
          <Image
                        src="/img/Pcblogo.png"
                        alt="Logo Protección Civil y Bomberos Izúcar"
                        width={120} // Ligeramente más pequeño para mejor balance
                        height={120}
                        priority
                      />
          <div className="text-center mt-3">
            <p className="text-lg font-bold tracking-tight">PROTECCIÓN CIVIL</p>
            <p className="text-base font-medium text-orange-200">IZÚCAR DE MATAMOROS</p>
          </div>
        </div>

        {/* Sección de Navegación: Los botones en una fila lateral */}
        <nav className="flex flex-col space-y-4 flex-grow">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => router.push(opcion.ruta)}
              // Botones: Estilizados en Teal (#1E838F) con hover suave
              className={`flex items-center gap-4 w-full p-4 rounded-xl text-left text-lg font-semibold transition duration-300 active:scale-95 ${
                index === 0 // Simulamos que la primera opción está seleccionada
                  ? "bg-teal-800 shadow-md text-white border border-teal-900" 
                  : "bg-teal-700 hover:bg-teal-600/60 text-teal-100 hover:text-white"
              }`}
            >
              <span className="text-3xl">{opcion.icono}</span>
              {opcion.titulo}
            </button>
          ))}
        </nav>

        {/* Sección del Pie del Sidebar: Cerrar Sesión */}
        <button
          className="flex items-center gap-4 w-full p-4 rounded-xl text-left text-lg font-medium bg-white text-teal-700 border-2 border-teal-700 hover:bg-teal-50 transition duración-300"
          onClick={() => router.push("users/login")}
        >
          <span className="text-3xl">🚪</span>
          Cerrar Sesión
        </button>
      </aside>

      {/* 3. ÁREA DE CONTENIDO PRINCIPAL: Blanca, a la derecha del sidebar */}
      <main className="flex-grow bg-white p-12 rounded-3xl shadow-xl m-6 border border-slate-100">
        
        {/* Cabecera del Panel */}
        <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Panel Administrador
          </h1>
          {/* Perfil simulado */}
          <div className="flex items-center gap-4">
            <p className="text-slate-600">Admin. Izúcar</p>
            <span className="w-12 h-12 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-xl">
              👤
            </span>
          </div>
        </div>

        {/* Área de Visualización (Simulada para que no se vea vacío) */}
        <div className="bg-slate-50 p-12 rounded-3xl text-center border-2 border-dashed border-slate-200 h-96 flex flex-col items-center justify-center space-y-6">
          <div className="text-8xl p-6 bg-teal-100 rounded-full text-teal-700">👤</div>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Bienvenido al Módulo de {opciones[0].titulo}
          </h2>
          <p className="text-xl text-slate-600 max-w-xl">
            Aquí podrás gestionar los usuarios del sistema. Selecciona una opción del panel lateral para navegar por los diferentes módulos.
          </p>
        </div>

      </main>
    </div>
  );
}