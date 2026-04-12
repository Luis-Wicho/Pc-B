import { PaymentOrder } from "../domain/payment-order.entity";
export interface PaymentOrderRepository {
  create(order: PaymentOrder): Promise<PaymentOrder>;
  getById(id: number): Promise<PaymentOrder | null>;
  generatePDF(order: PaymentOrder): Promise<string>;
}