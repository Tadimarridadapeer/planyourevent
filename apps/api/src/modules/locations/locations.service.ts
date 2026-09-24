import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async getCities() {
    const locations = await this.prisma.location.findMany({
      select: {
        city: true,
        citySlug: true,
        state: true,
        district: true,
        isPopular: true,
      },
      distinct: ['citySlug'],
      orderBy: { city: 'asc' },
    });
    return locations;
  }

  async getAreasByCity(citySlug: string) {
    return this.prisma.location.findMany({
      where: { citySlug },
      select: { id: true, area: true, pincode: true },
    });
  }
}
