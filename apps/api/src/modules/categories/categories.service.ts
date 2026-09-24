import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getEventCategories() {
    return this.prisma.eventCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getVendorCategories() {
    return this.prisma.vendorCategory.findMany({
      include: {
        subcategories: true,
      },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
