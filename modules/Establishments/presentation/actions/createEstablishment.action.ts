import { EstablishmentsRepositoryImpl } from "@/modules/Establishments/infrastructure/establishmentsRepositoryImpl"
import { Establishment } from "@/modules/Establishments/domain/establishment.entity"

export async function createEstablishment(establishment: Establishment) {
  const repository = new EstablishmentsRepositoryImpl()
  try {
    const result = await repository.create(establishment)
    return result
  } catch (error) {
    console.error("Error creando establecimiento:", error)
    throw error
  }
}