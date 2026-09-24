import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export interface VendorQueryDto {
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  verifiedOnly?: boolean;
  featuredOnly?: boolean;
  sortBy?: 'recommended' | 'rating' | 'price_asc' | 'price_desc' | 'reviews' | 'newest';
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: VendorQueryDto) {
    const {
      city = 'Anantapur',
      category,
      minPrice,
      maxPrice,
      rating,
      verifiedOnly,
      featuredOnly,
      sortBy = 'recommended',
      search,
      page = 1,
      limit = 20,
    } = query;

    const where: any = {
      status: 'PUBLISHED',
    };

    if (city) {
      where.city = { equals: city };
    }

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.startingPrice = {};
      if (minPrice !== undefined) where.startingPrice.gte = Number(minPrice);
      if (maxPrice !== undefined) where.startingPrice.lte = Number(maxPrice);
    }

    if (rating !== undefined) {
      where.rating = { gte: Number(rating) };
    }

    if (verifiedOnly) {
      where.verified = true;
    }

    if (featuredOnly) {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { shortDescription: { contains: search } },
        { description: { contains: search } },
        { address: { contains: search } },
      ];
    }

    let orderBy: any = [{ featured: 'desc' }, { rating: 'desc' }];
    if (sortBy === 'rating') orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }];
    if (sortBy === 'price_asc') orderBy = [{ startingPrice: 'asc' }];
    if (sortBy === 'price_desc') orderBy = [{ startingPrice: 'desc' }];
    if (sortBy === 'reviews') orderBy = [{ reviewCount: 'desc' }];
    if (sortBy === 'newest') orderBy = [{ createdAt: 'desc' }];

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [items, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          category: {
            select: { name: true, slug: true, icon: true },
          },
        },
      }),
      this.prisma.vendor.count({ where }),
    ]);

    return {
      items,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    };
  }

  async findBySlug(slug: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { slug },
      include: {
        category: true,
        packages: { orderBy: { sortOrder: 'asc' } },
        services: true,
        portfolios: { orderBy: { sortOrder: 'asc' } },
        reviews: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor with slug ${slug} not found`);
    }

    return vendor;
  }

  // Admin Methods
  async adminCreateVendor(data: any) {
    return this.prisma.vendor.create({
      data: {
        businessName: data.businessName,
        slug: data.slug || data.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        categoryId: data.categoryId,
        description: data.description,
        shortDescription: data.shortDescription,
        city: data.city || 'Anantapur',
        state: data.state || 'Andhra Pradesh',
        address: data.address,
        phone: data.phone,
        email: data.email,
        startingPrice: Number(data.startingPrice),
        verified: data.verified ?? true,
        verifiedLevel: data.verifiedLevel || 'VERIFIED',
        featured: data.featured ?? false,
        status: data.status || 'PUBLISHED',
        coverImage: data.coverImage,
      },
    });
  }

  async adminUpdateVendor(id: string, data: any) {
    return this.prisma.vendor.update({
      where: { id },
      data,
    });
  }

  async adminDeleteVendor(id: string) {
    return this.prisma.vendor.delete({
      where: { id },
    });
  }
}
