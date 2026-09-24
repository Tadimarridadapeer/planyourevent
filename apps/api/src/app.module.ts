import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { LocationsModule } from './modules/locations/locations.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { EventsModule } from './modules/events/events.module';
import { QuotesModule } from './modules/quotes/quotes.module';

@Module({
  imports: [
    AuthModule,
    LocationsModule,
    CategoriesModule,
    VendorsModule,
    EventsModule,
    QuotesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
