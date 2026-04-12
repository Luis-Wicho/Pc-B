
import { PaymentOrder } from "../domain/payment-order.entity";
import { PaymentOrderRepository } from "../domain/payment_order.repository";

export class CreatePaymentOrder {
  constructor(private repo: PaymentOrderRepository) {}

  async execute(order: PaymentOrder): Promise<PaymentOrder> {

    if (!order.establishmentId || !order.userId) {
      throw new Error("Missing data");
    }

    if (order.amount <= 0) {
      throw new Error("Invalid amount");
    }

    return await this.repo.create(order);
  }
}