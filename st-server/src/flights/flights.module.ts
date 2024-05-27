/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationService } from 'src/location/location.service';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService, PrismaService, LocationService],
})
export class FlightsModule {}
