import { paymentorderrepository } from "../domain/payment_order.repository";


export class GeneratePDF {
  constructor(private repo: paymentorderrepository) {}

  async execute(order: any) {
    return await this.repo.generatePDF(order);
  }
}