import { UpdatePaymentMethodUseCase } from '../../../../application/use-case/implementations/payment/update-payment-method-use-case';
import { UpdatePaymentStatusUseCase } from '../../../../application/use-case/implementations/payment/update-payment-status-use-case';
import { prismaOrderRepositories } from '../../../repositories/prisma/prisma-order-repositories';
import { UpdatePaymentMethodController } from '../../controllers/payment/update-payment-method-controller';
import { UpdatePaymentStatusController } from '../../controllers/payment/update-payment-status-controller';
import { PaymentRouter } from './payment-router';

const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(
  prismaOrderRepositories,
);
const updatePaymentStatusController = new UpdatePaymentStatusController(
  updatePaymentStatusUseCase,
);

const updatePaymentMethodUseCase = new UpdatePaymentMethodUseCase(
  prismaOrderRepositories,
);
const updatePaymentMethodController = new UpdatePaymentMethodController(
  updatePaymentMethodUseCase,
);

export const paymentRouter = new PaymentRouter(
  updatePaymentStatusController,
  updatePaymentMethodController,
);
