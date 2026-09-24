import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { QuotesService, CreateQuoteRequestDto } from './quotes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quote Requests')
@Controller('api/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  async createQuote(@Body() dto: CreateQuoteRequestDto) {
    return this.quotesService.createQuoteRequest(dto);
  }

  // Admin Endpoints
  @Get('admin')
  async adminGetAllQuotes() {
    return this.quotesService.adminGetAllQuotes();
  }

  @Patch('admin/:id/status')
  async adminUpdateStatus(
    @Param('id') id: string,
    @Body('status') status: 'PENDING' | 'CONTACTED' | 'QUOTED' | 'CLOSED',
  ) {
    return this.quotesService.adminUpdateQuoteStatus(id, status);
  }
}
