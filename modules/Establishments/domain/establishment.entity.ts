import { Key } from "readline";

export interface Establishment {
  id: Key | null | undefined;
  id_establecimiento: number;
  no_expediente: string;
  nombre_establecimiento: string;
  nombre_propietario?: string;
  direccion?: string;
  estatus?: string;
  id_tamanio?: number;
  giro_comercial?: string;
  observaciones?: string;
  id_tarifa?: number;
}