import { Controller, Get, HttpStatus, Res, Version } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseMessage } from 'src/utils/responseMessage';
import { swagger_api_response } from 'src/utils/swaggerApiResponse.entity';
import { Response } from 'express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  /**
   * @api        {POST} /products
   * @apiName     products
   * @apiGroup    User Api
   * @create_at   {Date} 12/10/2024
   * @developer   Govind Savaliya
   */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ResponseMessage.successfully_operation,
    schema: {
      $ref: getSchemaPath(swagger_api_response),
      example: {
        isSuccess: true,
        message: ResponseMessage.message,
        code: HttpStatus.CREATED,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ResponseMessage.error_message,
    schema: {
      $ref: getSchemaPath(swagger_api_response),
      example: {
        isSuccess: false,
        message: ResponseMessage.message,
        code: HttpStatus.BAD_REQUEST,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ResponseMessage.something_went_wrong,
    schema: {
      $ref: getSchemaPath(swagger_api_response),
      example: {
        isSuccess: false,
        message: ResponseMessage.internal_server_error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      },
    },
  })
  @Version('1')
  @ApiOperation({ summary: 'Get Product Action' })
  @Get('')
  public async getProductsWithPricingAction(@Res() response: Response) {
    try {
      return await this.productService.getProductsWithPricing(response);
    } catch (error) {
      throw response.send({
        isSuccess: false,
        message: ResponseMessage.internal_server_error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }
}
