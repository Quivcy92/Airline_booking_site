/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Location } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }

  findWhere(query: string): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }
  findOneWhere(query: string): Promise<Location> {
    return this.prisma.location.findFirst({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }
}
