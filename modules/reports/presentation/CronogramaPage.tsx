import React, { useEffect, useState } from "react";
import { GetActivities } from "../application/getActivities";
import { CreateActivity } from "../application/createActivity";
import { ActivityRepositoryImpl } from "../infrastructure/activity.repository.impl";

const repo = new ActivityRepositoryImpl();

export default function CronogramaPage() {

  const [activities, setActivities] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: ""
  });

  const loadActivities = async () => {
    const data = await new GetActivities(repo).execute();
    setActivities(data);
  };

  const handleSubmit = async () => {
    await new CreateActivity(repo).execute(form);
    setForm({ title: "", description: "", date: "" });
    loadActivities();
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <div>
      <h1>Cronograma de Actividades</h1>

      <input
        placeholder="Título"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Descripción"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="datetime-local"
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })}
      />

      <button onClick={handleSubmit}>Guardar</button>

      <h2>Actividades</h2>

      <ul>
        {activities.map(a => (
          <li key={a.id}>
            {a.title} - {a.date}
          </li>
        ))}
      </ul>
    </div>
  );
}