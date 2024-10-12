import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  sku: string;

  @ApiProperty({ required: true })
  @IsString()
  productName: string;

  @ApiProperty({ required: true })
  @IsNumber()
  category: number;
}
