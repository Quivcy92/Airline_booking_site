/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class FetchQueryResponse {
  @ApiProperty({ example: 'Locations fetched successfully' })
  message: string;

  @ApiProperty({
    example: {},
    nullable: true,
  })
  data?: any;

  @ApiProperty({ example: null, nullable: true })
  errors?: { [key: string]: any };

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  status: number;
}
