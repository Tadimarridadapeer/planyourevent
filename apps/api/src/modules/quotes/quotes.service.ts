import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export interface CreateQuoteRequestDto {
  vendorId: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  city?: string;
  guestCount: number;
  budget?: number;
  servicesRequired: string;
  notes?: string;
}

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async createQuoteRequest(dto: CreateQuoteRequestDto) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { id: dto.vendorId },
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor not found`);
    }

    const quote = await this.prisma.quoteRequest.create({
      data: {
        vendorId: dto.vendorId,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        eventType: dto.eventType,
        eventDate: new Date(dto.eventDate),
        city: dto.city || 'Anantapur',
        guestCount: Number(dto.guestCount),
        budget: dto.budget ? Number(dto.budget) : null,
        servicesRequired: dto.servicesRequired,
        notes: dto.notes,
        status: 'PENDING',
      },
      include: {
        vendor: {
          select: { businessName: true, phone: true, email: true },
        },
      },
    });

    return {
      success: true,
      message: "We've received your request. Our team will connect you with the vendor shortly.",
      quote,
    };
  }

  async adminGetAllQuotes() {
    return this.prisma.quoteRequest.findMany({
      include: {
        vendor: {
          select: { businessName: true, slug: true, phone: true, category: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async adminUpdateQuoteStatus(id: string, status: 'PENDING' | 'CONTACTED' | 'QUOTED' | 'CLOSED') {
    return this.prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });
  }
}
