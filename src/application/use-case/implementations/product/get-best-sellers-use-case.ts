import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type {
  ProductModel,
  ProductRepositories,
} from '../../../repositories/product-repositories';
import type { GetBestSellersUseCaseProtocol } from '../../protocols/products/get-best-sellers-use-case-protocol';

export class GetBestSellersUseCase
  implements GetBestSellersUseCaseProtocol.Interface
{
  constructor(
    private readonly orderRepositories: OrderRepositories,
    private readonly productRepositories: ProductRepositories,
  ) {}

  async execute(
    input: GetBestSellersUseCaseProtocol.Input,
  ): Promise<Either<void, GetBestSellersUseCaseProtocol.Output>> {
    const bestSellerProducts =
      await this.orderRepositories.getBestSellersProductsIds(input.quantity);
    const productsIds = bestSellerProducts.map((item) => item.productId);

    const products =
      await this.productRepositories.getProductsOfIds(productsIds);
    const productsMap = new Map(
      products.map((product) => [product.id, product]),
    );

    const totalSoldMap = new Map(
      bestSellerProducts.map((bestSeller) => [
        bestSeller.productId,
        bestSeller.totalSold,
      ]),
    );

    const orderedProducts = bestSellerProducts
      .map((bestSeller) => productsMap.get(bestSeller.productId))
      .filter((product): product is ProductModel => Boolean(product));

    return eitherUtils.right(
      orderedProducts.map((product) => ({
        product,
        totalSold: totalSoldMap.get(product.id) ?? 0,
      })),
    );
  }
}
