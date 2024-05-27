/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { FlightsService } from 'src/flights/flights.service';
import { LocationService } from 'src/location/location.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService, FlightsService, LocationService, PrismaService],
})
export class BookingModule {}
