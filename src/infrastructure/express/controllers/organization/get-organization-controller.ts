import type { Request, Response } from 'express';
import type { GetOrganizationOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/organization/get-organization-of-id-use-case-protocol';
import { HttpResponse } from '../../../../application/response';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class GetOrganizationController {
  constructor(
    private readonly getOrganizationUseCase: GetOrganizationOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const output = await this.getOrganizationUseCase.execute();
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
