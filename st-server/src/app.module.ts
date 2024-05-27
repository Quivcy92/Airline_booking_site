import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { LocationModule } from './location/location.module';
import { FlightsModule } from './flights/flights.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [LocationModule, FlightsModule, BookingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
