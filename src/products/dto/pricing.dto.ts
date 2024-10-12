import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PricingDto {
  @ApiProperty({ required: true })
  @IsString()
  sku: string;

  @ApiProperty({ required: true })
  @IsNumber()
  price: number;
}
