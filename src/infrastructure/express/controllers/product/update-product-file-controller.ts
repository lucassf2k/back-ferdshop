import type { Request, Response } from 'express';
import type { UpdateProductFileUseCaseProtocol } from '../../../../application/use-case/protocols/products/update-product-file-use-case-protocol';
import z from 'zod';
import { HttpResponse } from '../../../../application/response';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestParamsValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class UpdateProductFileController {
  constructor(
    private readonly updateProductFileUseCase: UpdateProductFileUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      const httpError = HttpResponse.error('BAD_REQUEST', 'file not provided');
      return response.status(StatusCodeEnum.BAD_REQUEST).json(httpError);
    }
    const { id } = zodRequestParamsValidation.parse(request.params);
    const output = await this.updateProductFileUseCase.execute({
      id,
      file: request.file,
    });
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
