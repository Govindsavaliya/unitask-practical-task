import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { ResponseMessage } from 'src/utils/responseMessage';

@Injectable()
export class RandomJokeService {
  async getRandomJoke(response: Response): Promise<any> {
    try {
      const jokeData = await axios.get(
        'https://api.chucknorris.io/jokes/random',
      );
      if (!jokeData) {
        return response.send({
          isSuccess: false,
          message: ResponseMessage.failed_to_fetch_joke_data,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          data: {},
        });
      }
      return response.send({
        isSuccess: true,
        message: ResponseMessage.fetch_random_joke_data,
        code: HttpStatus.OK,
        data: { joke: jokeData.data },
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
