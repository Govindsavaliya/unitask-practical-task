import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.model';
import { ResponseMessage } from 'src/utils/responseMessage';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<any>,
    private readonly jwtService: JwtService,
  ) {}

  async userSignupApi(
    createUserDto: CreateUserDto,
    response: Response,
  ): Promise<any> {
    try {
      const { email, password, firstName, lastName } = createUserDto;
      if (password.length < 6) {
        return response.send({
          isSuccess: false,
          message: ResponseMessage.password_must_be_at_least_6_characters_long,
          code: HttpStatus.BAD_REQUEST,
          data: {},
        });
      }
      if (!email) {
        return response.send({
          isSuccess: false,
          message: ResponseMessage.please_enter_email_address,
          code: HttpStatus.FOUND,
          data: {},
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return response.send({
          isSuccess: false,
          message: ResponseMessage.invalid_email_format,
          code: HttpStatus.BAD_REQUEST,
          data: {},
        });
      }

      if (!password) {
        return response.send({
          isSuccess: false,
          message: ResponseMessage.please_enter_password,
          code: HttpStatus.FOUND,
          data: {},
        });
      }

      const userExistsData = await this.userModel.findOne({
        email: email,
      });

      if (userExistsData) {
        return response.send({
          isSuccess: false,
          message: ResponseMessage.email_already_associate_with_another_account,
          code: HttpStatus.CONFLICT,
          data: {},
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUserData = await this.userModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      });

      return response.send({
        isSuccess: true,
        message: ResponseMessage.user_created_successfully,
        code: HttpStatus.CREATED,
        data: newUserData,
      });
    } catch (error) {
      return response.send({
        isSuccess: false,
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }

  async userLoginApi(
    loginUserDto: LoginUserDto,
    response: Response,
  ): Promise<any> {
    try {
      const { email, password } = loginUserDto;
      const userData = await this.userModel.findOne({ email });

      if (!userData || !(await bcrypt.compare(password, userData.password))) {
        return response.send({
          isSuccess: false,
          message: ResponseMessage.please_try_to_correct_credentials,
          code: HttpStatus.UNAUTHORIZED,
          data: {},
        });
      }

      const token = this.jwtService.sign({ _id: userData._id });

      response.cookie('jwt', token, {
        expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
        httpOnly: true,
      });

      return response.send({
        isSuccess: true,
        message: ResponseMessage.login_successfully,
        code: HttpStatus.OK,
        data: { accessToken: token },
      });
    } catch (error) {
      return response.send({
        isSuccess: false,
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }

  async getUserProfileApi(request: Request, response?: Response): Promise<any> {
    try {
      const userId = await request.user;
      if (!userId) {
        throw response.send({
          isSuccess: false,
          message: ResponseMessage.data_not_found,
          code: HttpStatus.NOT_FOUND,
          data: {},
        });
      }
      const userLoginData = await this.userModel.findById(userId);
      return response.send({
        isSuccess: true,
        message: ResponseMessage.user_login_data_successfully,
        code: HttpStatus.OK,
        data: userLoginData,
      });
    } catch (error) {
      throw response.send({
        isSuccess: false,
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }

  async userLogoutApi(request: Request, response: Response): Promise<any> {
    try {
      // Clear the JWT token from the cookie
      response.clearCookie('jwt');
      response.cookie('jwt', '', {
        expires: new Date(0), // Expire the cookie immediately
        httpOnly: true,
      });
      return response.send({
        isSuccess: true,
        message: ResponseMessage.logout_successfully,
        code: HttpStatus.OK,
        data: {},
      });
    } catch (error) {
      return response.send({
        isSuccess: false,
        message: error.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  }
}
