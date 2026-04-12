export interface PaymentOrder{
    id: number;
    expirationDate: any;
    issueDate: any;
    amount: number;
    userId: any;
    establishmentId: any;
    update(tariff: any): unknown;
    getById(id: any): unknown;
    id_pago: number;
    id_establecimiento: string;
    monto: string;
    fecha_emision: string;
    fecha_vigencia: string;
    id_usuario: string;
}