import { Controller, Get, Query } from '@nestjs/common';
import { CityService, City } from './app.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  // Endpoint
  @Get('search')
  searchCities(@Query('q') query: string, 
  @Query('mode') mode: string, 
  @Query('page') page: string, 
  @Query('limit') limit: string): {cities: City[], totalCount: number} {
    return this.cityService.searchCities(query, mode, Number(page), Number(limit));
  }
}
