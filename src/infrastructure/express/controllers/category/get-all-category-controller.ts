import type { Request, Response } from 'express';
import type { GetAllCategoryUseCaseProtocol } from '../../../../application/use-case/protocols/category/get-all-category-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class GetAllCategoryController {
  constructor(
    private readonly getAllCategoryUseCase: GetAllCategoryUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categoris = await this.getAllCategoryUseCase.execute();
    return response.status(StatusCodeEnum.OK).json(categoris.value);
  }
}
