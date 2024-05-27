/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
export class CreateBookingDto {
  @ApiProperty({
    example: 'jojo',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @ApiProperty({
    example: 'siwa',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @ApiProperty({
    example: 'jojosiwa@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '+44567653478',
  })
  @IsNotEmpty()
  @IsString()
  mobile_number: string;
  @ApiProperty({
    example: '664f078fd528a063024c03c9',
  })
  @IsNotEmpty()
  @IsMongoId()
  flightId: string;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  no_of_tickets: number;
  @ApiProperty({
    example: 'economy',
  })
  @IsNotEmpty()
  @IsString()
  ticket_class: string;
}
