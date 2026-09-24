import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EventsService, CalculateBudgetDto } from './events.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events & Planning')
@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('calculate-budget')
  calculateBudget(@Body() dto: CalculateBudgetDto) {
    return this.eventsService.calculateBudgetSplit(dto);
  }

  @Post('create-plan')
  createPlan(@Body() dto: CalculateBudgetDto & { title?: string; userId?: string }) {
    return this.eventsService.createEventPlan(dto);
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.eventsService.getEvent(id);
  }
}
