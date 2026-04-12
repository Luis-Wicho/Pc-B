import { createtariff } from "../application/create_tariff.usecase";
import { PaymentOrderRepositoryImpl } from "../infraestructure/payment_order.repository.impl";
import { CreatePaymentOrder } from "../application/create_payment_order.usecase";
import { GeneratePDF } from "../application/generate_pdf.usecase";
import { TariffRepositoryImpl } from "../infraestructure/tariff_repository.impl";
import { UpdateTariff } from "../application/update_tariff.usecase";
import { GetTariffs } from "../application/get_tariffs.usecase";
import { deletetariff } from "../application/delete_tariff.usecase";
import { Tariff } from "../domain/tariff.entity";

const paymentRepo = new PaymentOrderRepositoryImpl();
const tariffRepo = new TariffRepositoryImpl();

export class PaymentOrderController {

  // TARIFAS
  createTariff(data: any) {
    return new createtariff(tariffRepo).execute(data);
  }

 updateTariff(data: Tariff) {
  const useCase = new UpdateTariff(tariffRepo);
  return useCase.execute(data);
}


  getTariffs() {
    return new GetTariffs(tariffRepo).execute();
  }

  deleteTariff(id: string) {
    return new deletetariff(tariffRepo).execute(id);
  }

  // ORDENES
  createOrder(data: any) {
    return new CreatePaymentOrder(paymentRepo).execute({
      id: data.id_pago,
      establishmentId: data.id_establecimiento,
      amount: Number(data.monto),
      issueDate: new Date(data.fecha_emision),
      expirationDate: new Date(data.fecha_vigencia),
      userId: data.id_usuario,
      update: function (tariff: any): unknown {
        throw new Error("Function not implemented.");
      },
      getById: function (id: any): unknown {
        throw new Error("Function not implemented.");
      },
      id_pago: 0,
      id_establecimiento: "",
      monto: "",
      fecha_emision: "",
      fecha_vigencia: "",
      id_usuario: ""
    });
  }

  generatePDF(order: any) {
    return new GeneratePDF(paymentRepo).execute(order);
  }
}