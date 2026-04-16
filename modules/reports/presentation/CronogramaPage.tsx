"use client";
import React, { useEffect, useState } from "react";
import { GetActivities } from "../application/getActivities";
import { ActivityRepositoryImpl } from "../infrastructure/activity.repository.impl";
import { CreateActivity } from "../application/createActivity";
import { useRouter } from "next/navigation";
import Image from "next/image";

const repo = new ActivityRepositoryImpl();

export default function CronogramaPage() {
  const router = useRouter();

  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: ""
  });

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await new GetActivities(repo).execute();
      setActivities(data);
    } catch (error) {
      console.error("Error al cargar actividades");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.date) {
      alert("Título y fecha son obligatorios");
      return;
    }

    try {
      await new CreateActivity(repo).execute(form);
      setForm({ title: "", description: "", date: "" });
      loadActivities();
    } catch (error) {
      console.error("Error al guardar actividad");
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* 🔥 CABECERA */}
      <div className="max-w-7xl mx-auto mb-12 border-b border-slate-100 pb-10 flex flex-col items-center">
        
        <div className="p-2 mb-4">
          <Image
            src="/img/Pcblogo.png"
            alt="Logo Protección Civil y Bomberos Izúcar"
            width={160}
            height={160}
            priority
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-teal-700 tracking-tight">
            PROTECCIÓN CIVIL
          </p>
          <p className="text-2xl font-semibold text-orange-600">
            Y BOMBEROS
          </p>
          <p className="text-lg text-slate-900 pt-1">
            IZÚCAR DE MATAMOROS, PUE.
          </p>
        </div>
      </div>

      {/* 🔥 TÍTULO */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-slate-100 pb-8">
        <h1 className="text-4xl font-extrabold text-slate-950">
          Cronograma de Actividades
        </h1>
        <p className="text-slate-500 text-lg mt-1">
          Planificación Operativa y Simulacros
        </p>
      </div>

      {/* 🔥 CONTENIDO */}
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Formulario */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <input
            placeholder="Título"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          <input
            placeholder="Descripción"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="datetime-local"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-700 text-white py-3 rounded-lg font-bold hover:bg-teal-800 transition"
          >
            Guardar
          </button>
        </div>

        {/* Lista */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Actividades</h2>

          {loading ? (
            <p className="text-slate-500">Cargando...</p>
          ) : activities.length === 0 ? (
            <p className="text-slate-400">No hay actividades registradas</p>
          ) : (
            <ul className="space-y-3">
              {activities.map((a) => (
                <li
                  key={a.id}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-slate-700">{a.title}</p>
                    <p className="text-sm text-slate-500">{a.description}</p>
                  </div>
                  <span className="text-sm text-teal-700 font-medium">
                    {new Date(a.date).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}