import type { Request, Response } from 'express';
import z from 'zod';
import type { SendWhatsAppToUsersUseCaseProtocol } from '../../../../application/use-case/protocols/notification/send-whatsapp-to-users';
import { MessageTopic } from '../../../../common/constants/message-topic';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z
  .object({
    customerPhone: z.string('customerPhone must be string').optional(),
    message: z.string('message must be string').min(1, 'message is required'),
    allUsers: z.boolean('allUsers must be boolean'),
  })
  .superRefine(({ customerPhone, allUsers }, ctx) => {
    if (customerPhone) return;
    if (allUsers) return;
    ctx.addIssue({
      code: 'custom',
      path: ['customerPhone'],
      message: 'if allUsers is false, customerPhone is required',
    });
  });

export class SendWhatsAppToUsersController {
  constructor(
    private readonly senWhatsAppToUsers: SendWhatsAppToUsersUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { customerPhone, message, allUsers } = zodRequestValidation.parse(
      request.body,
    );
    const routingKey = MessageTopic.WHATSAPP_SEND_MESSAGE;
    const either = await this.senWhatsAppToUsers.execute({
      allUsers,
      message,
      routingKey,
      customerPhone,
    });
    if (either.isLeft()) throw either.value;
    return response.status(StatusCodeEnum.OK).json(either.value);
  }
}
