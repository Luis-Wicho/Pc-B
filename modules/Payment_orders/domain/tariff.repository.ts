// Importamos la entidad OrdenPago que define la estructura de los datos
import {  PaymentOrder } from "./payment-order.entity";

// Definimos la interfaz del repositorio.
// Esta interfaz funciona como un contrato que indica qué operaciones
// se pueden realizar con las órdenes de pago.
export interface OrdenPagoRepository {

  // Método para obtener todas las órdenes de pago registradas.
  // Devuelve una promesa que contiene un arreglo de órdenes de pago.
getAll(): Promise<PaymentOrder[]>;

  // Método para crear una nueva orden de pago.
  // Recibe un objeto de tipo OrdenPago y devuelve
  // una promesa con la orden de pago creada.
create(ordenPago:PaymentOrder): Promise<PaymentOrder>;

  // Método para actualizar una orden de pago existente.
  // Recibe la orden de pago con los datos actualizados
  // y devuelve una promesa con la orden de pago actualizada.
update(ordenPago: PaymentOrder): Promise<PaymentOrder>;

  // Método para buscar una orden de pago por su ID.
  // Recibe el id de la orden de pago y devuelve:
  // - la orden de pago si existe
  // - null si no se encuentra en la base de datos.
findById(id: number): Promise<PaymentOrder| null>;
}