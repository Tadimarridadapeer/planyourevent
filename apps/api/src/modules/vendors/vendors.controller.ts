import { Controller, Get, Post, Patch, Delete, Query, Param, Body } from '@nestjs/common';
import { VendorsService, VendorQueryDto } from './vendors.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vendors')
@Controller('api/vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  async getVendors(@Query() query: VendorQueryDto) {
    return this.vendorsService.findAll(query);
  }

  @Get(':slug')
  async getVendorBySlug(@Param('slug') slug: string) {
    return this.vendorsService.findBySlug(slug);
  }

  // Admin Endpoints
  @Post('admin')
  async adminCreateVendor(@Body() body: any) {
    return this.vendorsService.adminCreateVendor(body);
  }

  @Patch('admin/:id')
  async adminUpdateVendor(@Param('id') id: string, @Body() body: any) {
    return this.vendorsService.adminUpdateVendor(id, body);
  }

  @Delete('admin/:id')
  async adminDeleteVendor(@Param('id') id: string) {
    return this.vendorsService.adminDeleteVendor(id);
  }
}
