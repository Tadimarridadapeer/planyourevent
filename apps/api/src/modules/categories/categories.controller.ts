import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('events')
  async getEventCategories() {
    return this.categoriesService.getEventCategories();
  }

  @Get('vendors')
  async getVendorCategories() {
    return this.categoriesService.getVendorCategories();
  }
}
