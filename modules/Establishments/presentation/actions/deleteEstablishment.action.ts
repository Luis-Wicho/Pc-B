import { Establishment } from "@/modules/Establishments/domain/establishment.entity"

export async function createEstablishment(data: Partial<Establishment>) {

  const res = await fetch("/api/establecimientos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.error || "Error al crear")
  }

  return result
}