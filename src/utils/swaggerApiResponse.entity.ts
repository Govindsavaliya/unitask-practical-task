import { ApiProperty } from '@nestjs/swagger';

export class swagger_api_response {
  @ApiProperty({
    example: 'success',
    description: 'status',
  })
  isSuccess: boolean;

  @ApiProperty({
    description: 'status',
  })
  message?: string;

  @ApiProperty({
    example: 'success',
    description: 'status',
  })
  code: number;

  @ApiProperty({
    description: 'could contain some info',
  })
  data?: object;
}
