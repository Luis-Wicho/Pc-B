"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();

  const opciones = [
    { titulo: "Usuarios", icono: "👥", ruta: "/users" },
    { titulo: "Establecimientos", icono: "🏪", ruta: "/Establishments" },
    { titulo: "Tarifas", icono: "💲", ruta: "/rates" },
    { titulo: "Reportes", icono: "📊", ruta: "/Reports/panelReports" },
    { titulo: "Documentos", icono: "🗂️", ruta: "/Documents" },
  ];

  return (
    // 1. Fondo general: Aplicamos la pleca aquí para que cubra todo el ancho detrás de los elementos
    <div 
      className="min-h-screen bg-slate-50 flex font-lato relative overflow-hidden"
      style={{
        backgroundImage: 'url(/img/pleca.png)',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 40px',
        backgroundPosition: 'top center',
      }}
    >
      
      {/* 2. BARRA LATERAL IZQUIERDA: Sin cambios en estilo, solo z-index para estar sobre el fondo si es necesario */}
      <aside className="w-64 bg-teal-700 text-white flex flex-col p-6 shadow-xl space-y-10 border-r border-teal-800 rounded-r-3xl my-6 ml-6 relative z-10">
        
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/img/Pcblogo.png"
            alt="Logo Protección Civil y Bomberos Izúcar"
            width={120}
            height={120}
            priority
          />
          <div className="text-center mt-3">
            <p className="text-lg font-bold tracking-tight uppercase">Protección Civil</p>
            <p className="text-sm font-medium text-orange-200">IZÚCAR DE MATAMOROS</p>
          </div>
        </div>

        <nav className="flex flex-col space-y-4 flex-grow">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => router.push(opcion.ruta)}
              className={`flex items-center gap-4 w-full p-4 rounded-xl text-left text-lg font-semibold transition duration-300 active:scale-95 ${
                index === 0 
                  ? "bg-teal-800 shadow-md text-white border border-teal-900" 
                  : "bg-teal-700 hover:bg-teal-600/60 text-teal-100 hover:text-white"
              }`}
            >
              <span className="text-3xl">{opcion.icono}</span>
              {opcion.titulo}
            </button>
          ))}
        </nav>

        <button
          className="flex items-center gap-4 w-full p-4 rounded-xl text-left text-lg font-medium bg-white text-teal-700 border-2 border-teal-700 hover:bg-teal-50 transition duration-300"
          onClick={() => router.push("users/login")}
        >
          <span className="text-3xl">🚪</span>
          Cerrar Sesión
        </button>
      </aside>

      {/* 3. ÁREA DE CONTENIDO PRINCIPAL: 
          - Se aumentó el mt-16 (margen superior) para que se vea la pleca arriba.
          - Se ajustó el max-w-5xl y mx-auto para que la tarjeta no sea tan gigante.
      */}
      <main className="flex-grow bg-white p-10 rounded-3xl shadow-xl mt-16 mb-6 mr-6 ml-6 border border-slate-100 relative z-10 max-w-5xl">
        
        {/* Cabecera del Panel */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Panel Administrador
            </h1>
            <p className="text-slate-500 font-medium">Gestión del Sistema</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-slate-900 font-bold leading-none">Admin. Izúcar</p>
              <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">Superusuario</p>
            </div>
            <span className="w-12 h-12 rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center text-xl shadow-sm">
              👤
            </span>
          </div>
        </div>

        {/* Área de Visualización */}
        <div className="bg-slate-50 p-10 rounded-3xl text-center border-2 border-dashed border-slate-200 min-h-[400px] flex flex-col items-center justify-center space-y-6">
          <div className="text-7xl p-6 bg-white shadow-sm border border-slate-100 rounded-full text-teal-700">
            {opciones[0].icono}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            Bienvenido al Módulo de {opciones[0].titulo}
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Utiliza el menú lateral para navegar entre las diferentes herramientas administrativas. Los cambios realizados se verán reflejados en tiempo real.
          </p>
          
          <div className="pt-4">
             <button className="px-6 py-2 bg-teal-700 text-white rounded-lg font-bold hover:bg-teal-800 transition">
               Ver Actividad Reciente
             </button>
          </div>
        </div>

      </main>
    </div>
  );
}