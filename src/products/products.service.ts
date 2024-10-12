import { HttpStatus, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PricingDto } from './dto/pricing.dto';
import { CategoryDto } from './dto/category.dto';
import { Response } from 'express';
import { ResponseMessage } from 'src/utils/responseMessage';

@Injectable()
export class ProductsService {
  private products: ProductDto[] = [
    { id: 1, sku: 'abc', productName: 'name 1', category: 1 },
    { id: 2, sku: 'def', productName: 'name 2', category: 2 },
    { id: 3, sku: 'ghi', productName: 'name 1', category: 2 },
    { id: 4, sku: 'klm', productName: 'name 1', category: 3 },
    { id: 5, sku: 'xyz', productName: 'name 1', category: 1 },
  ];

  private pricing: PricingDto[] = [
    { sku: 'abc', price: 10 },
    { sku: 'def', price: 20 },
    { sku: 'ghi', price: 30 },
    { sku: 'klm', price: 40 },
    { sku: 'xyz', price: 50 },
  ];

  private categories: CategoryDto[] = [
    { id: 1, name: 'category 1' },
    { id: 2, name: 'category 2' },
    { id: 3, name: 'category 3' },
    { id: 4, name: 'category 4' },
    { id: 5, name: 'category 5' },
  ];

  async getProductsWithPricing(response: Response) {
    const combinedProducts = this.products.map((product) => {
      const productPrice =
        this.pricing.find((price) => price.sku === product.sku)?.price || 0;
      const categoryName =
        this.categories.find((category) => category.id === product.category)
          ?.name || '';
      return {
        ...product,
        price: productPrice,
        categoryName,
      };
    });
    return response.send({
      isSuccess: true,
      message: ResponseMessage.get_product_data_successfully,
      code: HttpStatus.OK,
      data: combinedProducts,
    });
  }
}
