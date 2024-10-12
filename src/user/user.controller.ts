import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseMessage } from 'src/utils/responseMessage';
import { swagger_api_response } from 'src/utils/swaggerApiResponse.entity';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @api        {POST} /signup
   * @apiName     user signup
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
  @ApiOperation({ summary: 'User Signup Action' })
  @Post('signup')
  public async userSignupApiAction(
    @Body() body: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      return await this.userService.userSignupApi(body, response);
    } catch (error) {
      throw response.send({
        isSuccess: false,
        message: ResponseMessage.internal_server_error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }

  /**
   * @api        {POST} /login
   * @apiName     user login
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
  @ApiOperation({ summary: 'User Login Action' })
  @Post('login')
  public async userLoginApiAction(
    @Body() body: LoginUserDto,
    @Res() response: Response,
  ) {
    try {
      return await this.userService.userLoginApi(body, response);
    } catch (error) {
      throw response.send({
        isSuccess: false,
        message: ResponseMessage.internal_server_error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }

  /**
   * @api        {POST} /me
   * @apiName     get User login
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
  @ApiOperation({ summary: 'User Login Data Action' })
  @Get('me')
  public async getLoginUserApiAction(
    @Res() response: Response,
    @Req() request: Request,
  ) {
    try {
      return await this.userService.getUserProfileApi(request, response);
    } catch (error) {
      return response.send({
        isSuccess: false,
        message: ResponseMessage.internal_server_error,
        code: HttpStatus.NOT_FOUND,
        data: {},
      });
    }
  }

  /**
   * @api        {GET} /logout
   * @apiName     user logout
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
  @UseGuards(AuthGuard())
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'User Logout Action' })
  @Get('logout')
  public async userLogoutApiAction(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      return await this.userService.userLogoutApi(request, response);
    } catch (error) {
      return response.send({
        isSuccess: false,
        message: ResponseMessage.internal_server_error,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }
}
