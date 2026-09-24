import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export interface CalculateBudgetDto {
  eventType: string;
  location?: string;
  eventDate?: string;
  guestCount?: number;
  totalBudget: number;
}

const CATEGORY_ALLOCATION_RULES: Record<string, { category: string; percentage: number }[]> = {
  Wedding: [
    { category: 'Venue', percentage: 15 },
    { category: 'Catering', percentage: 28 },
    { category: 'Decoration', percentage: 15 },
    { category: 'Photography', percentage: 10 },
    { category: 'Makeup', percentage: 4.5 },
    { category: 'Entertainment', percentage: 3 },
    { category: 'Invitations', percentage: 2.25 },
    { category: 'Transport', percentage: 2.25 },
    { category: 'Miscellaneous', percentage: 20 },
  ],
  Engagement: [
    { category: 'Venue', percentage: 20 },
    { category: 'Catering', percentage: 35 },
    { category: 'Decoration', percentage: 15 },
    { category: 'Photography', percentage: 12 },
    { category: 'Makeup', percentage: 5 },
    { category: 'Invitations', percentage: 3 },
    { category: 'Miscellaneous', percentage: 10 },
  ],
  Birthday: [
    { category: 'Venue', percentage: 20 },
    { category: 'Catering', percentage: 40 },
    { category: 'Decoration', percentage: 20 },
    { category: 'Photography', percentage: 10 },
    { category: 'Cake & Gifts', percentage: 10 },
  ],
  Default: [
    { category: 'Venue', percentage: 20 },
    { category: 'Catering', percentage: 35 },
    { category: 'Decoration', percentage: 18 },
    { category: 'Photography', percentage: 12 },
    { category: 'Miscellaneous', percentage: 15 },
  ],
};

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  calculateBudgetSplit(dto: CalculateBudgetDto) {
    const rules = CATEGORY_ALLOCATION_RULES[dto.eventType] || CATEGORY_ALLOCATION_RULES['Default'];
    const total = Number(dto.totalBudget);

    const breakdown = rules.map((r) => {
      const amount = Math.round((total * r.percentage) / 100);
      return {
        category: r.category,
        percentage: r.percentage,
        allocatedAmount: amount,
      };
    });

    return {
      eventType: dto.eventType,
      location: dto.location || 'Anantapur',
      eventDate: dto.eventDate,
      guestCount: dto.guestCount || 500,
      totalBudget: total,
      allocations: breakdown,
    };
  }

  async createEventPlan(dto: CalculateBudgetDto & { title?: string; userId?: string }) {
    const split = this.calculateBudgetSplit(dto);
    const eventDateObj = dto.eventDate ? new Date(dto.eventDate) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    const event = await this.prisma.event.create({
      data: {
        userId: dto.userId,
        eventCategory: dto.eventType,
        title: dto.title || `My ${dto.eventType}`,
        city: dto.location || 'Anantapur',
        eventDate: eventDateObj,
        guestCount: dto.guestCount || 500,
        budget: dto.totalBudget,
        status: 'PLANNING',
        tasks: {
          create: [
            { title: 'Finalize venue', categoryName: 'Venue', sortOrder: 1 },
            { title: 'Confirm catering menu', categoryName: 'Catering', sortOrder: 2 },
            { title: 'Select photographer', categoryName: 'Photography', sortOrder: 3 },
            { title: 'Approve stage decoration', categoryName: 'Decoration', sortOrder: 4 },
            { title: 'Book makeup artist', categoryName: 'Makeup', sortOrder: 5 },
            { title: 'Order invitation cards', categoryName: 'Invitations', sortOrder: 6 },
          ],
        },
        budgetTracker: {
          create: {
            totalBudget: dto.totalBudget,
            allocatedBudget: dto.totalBudget,
            items: {
              create: split.allocations.map((item) => ({
                categoryName: item.category,
                allocatedAmount: item.allocatedAmount,
                spentAmount: 0,
                percentage: item.percentage,
              })),
            },
          },
        },
      },
      include: {
        tasks: true,
        budgetTracker: {
          include: { items: true },
        },
      },
    });

    return event;
  }

  async getEvent(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        tasks: { orderBy: { sortOrder: 'asc' } },
        budgetTracker: {
          include: { items: true },
        },
      },
    });
  }
}
