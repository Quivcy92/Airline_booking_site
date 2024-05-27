/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class FetchQuery {
  @ApiProperty({
    example: 'turk',
  })
  name: string;
}
