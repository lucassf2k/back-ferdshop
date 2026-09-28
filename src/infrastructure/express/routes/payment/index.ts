import { UpdatePaymentStatusUseCase } from '../../../../application/use-case/implementations/payment/update-payment-status-use-case';
import { prismaOrderRepositories } from '../../../repositories/prisma/prisma-order-repositories';
import { UpdatePaymentStatusController } from '../../controllers/payment/update-payment-status-controller';
import { PaymentRouter } from './payment-router';

const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(
  prismaOrderRepositories,
);
const updatePaymentStatusController = new UpdatePaymentStatusController(
  updatePaymentStatusUseCase,
);

export const paymentRouter = new PaymentRouter(updatePaymentStatusController);
