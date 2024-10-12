import {
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseMessage } from 'src/utils/responseMessage';
import { swagger_api_response } from 'src/utils/swaggerApiResponse.entity';
import { RandomJokeService } from './random-joke.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Random-joke')
@Controller('random-joke')
export class RandomJokeController {
  constructor(private readonly randomJokeService: RandomJokeService) {}

  /**
   * @api        {POST} /random-joke
   * @apiName     random-joke
   * @apiGroup    User Api
   * @create_at   {Date} 11/10/2024
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
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'User Random Joke Action' })
  @Get('')
  public async getRandomJokeAction(@Res() response: Response) {
    try {
      return await this.randomJokeService.getRandomJoke(response);
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
