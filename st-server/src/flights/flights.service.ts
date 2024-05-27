/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Flight, Prisma } from '@prisma/client';

@Injectable()
export class FlightsService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.FlightUncheckedCreateInput): Promise<Flight> {
    return this.prisma.flight.create({
      data,
    });
  }
  findAll(roundTrip: boolean): Promise<Flight[]> {
    return this.prisma.flight.findMany({
      where: {
        roundTrip,
      },
      take: 5,
      include: {
        airline: true,
        origin: true,
        destination: true,
      },
    });
  }
  findOne(where: Prisma.FlightWhereUniqueInput): Promise<Flight> {
    return this.prisma.flight.findUnique({
      where,
      include: {
        airline: true,
        origin: true,
        destination: true,
      },
    });
  }
  findWhere(
    originId: string,
    destinationId: string,
    roundTrip: boolean,
  ): Promise<Flight[]> {
    return this.prisma.flight.findMany({
      where: {
        originId,
        destinationId,
        roundTrip,
      },
      include: {
        airline: true,
        origin: true,
        destination: true,
      },
    });
  }
}
