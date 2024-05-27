/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '664f07bad528a063024c0417',
  })
  airlineId: string;
  @IsNotEmpty()
  @ApiProperty({
    example: '664f0787d528a063024c03bb',
  })
  originId: string;
  @IsNotEmpty()
  @ApiProperty({
    example: '664f078fd528a063024c03c9',
  })
  destinationId: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 5000.0,
  })
  price: number;
  @IsNotEmpty()
  @ApiProperty({
    example: true,
  })
  roundTrip: boolean;
  @IsNotEmpty()
  @ApiProperty({
    example: 'turk',
  })
  departureDate: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'turk',
  })
  arrivalDate: string;
}

export class FetchFlightQuery {
  @IsNotEmpty()
  @ApiProperty({
    example: 'turk',
  })
  originId: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'turk',
  })
  destinationId: string;
  @IsNotEmpty()
  @ApiProperty({
    example: false,
  })
  roundTrip: boolean;
}
