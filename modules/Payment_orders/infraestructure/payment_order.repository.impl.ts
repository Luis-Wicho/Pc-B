import * as fs from "fs";

import { PaymentOrderRepository } from "../domain/payment_order.repository";
import { PaymentOrder } from "../domain/payment-order.entity";


export class PaymentOrderRepositoryImpl implements PaymentOrderRepository {

  private orders: PaymentOrder[] = [];

  async create(order: PaymentOrder): Promise<PaymentOrder> {
    this.orders.push(order);
    return order;
  }

  async getById(id: number): Promise<PaymentOrder | null> {
    return this.orders.find(o => o.id === id) || null;
  }

  async generatePDF(order: PaymentOrder): Promise<string> {
    const file = `./order-${order.id}.pdf`;

    const content = `
    PAYMENT ORDER
    -------------------
    Establishment: ${order.establishmentId}
    Amount: ${order.amount}
    Issue Date: ${order.issueDate}
    Expiration Date: ${order.expirationDate}
    User: ${order.userId}
    `;

    fs.writeFileSync(file, content);
    return file;
  }
}