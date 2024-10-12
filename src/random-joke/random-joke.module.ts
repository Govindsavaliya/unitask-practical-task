import { Module } from '@nestjs/common';
import { RandomJokeService } from './random-joke.service';
import { RandomJokeController } from './random-joke.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [RandomJokeService],
  controllers: [RandomJokeController],
})
export class RandomJokeModule {}
