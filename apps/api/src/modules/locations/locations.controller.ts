import { Controller, Get, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('api/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('cities')
  async getCities() {
    return this.locationsService.getCities();
  }

  @Get('cities/:citySlug/areas')
  async getAreas(@Param('citySlug') citySlug: string) {
    return this.locationsService.getAreasByCity(citySlug);
  }
}
