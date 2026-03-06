export interface ordenes_pago{
    id_pago: number;
    id_establecimiento: string;
    monto: string;
    fecha_emision: string;
    fecha_vigencia: string;
    id_usuario: string;
}

/**CREATE TABLE ordenes_pago (
    id_pago SERIAL PRIMARY KEY,
    id_establecimiento INTEGER NOT NULL REFERENCES establecimientos(id_establecimiento),
    monto NUMERIC(10,2) NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vigencia DATE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario)
); */