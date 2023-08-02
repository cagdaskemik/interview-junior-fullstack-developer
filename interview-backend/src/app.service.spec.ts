import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './app.controller';
import { CityService } from './app.service';

describe('AppController', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search cities by beginning', () => {
    const results = service.searchCities('Ber', 'beginning', 1, 5);
    expect(results.totalCount).toBe(2);
    expect(results.cities[0].cityName).toEqual('Berlin');
    expect(results.cities[1].cityName).toEqual('Bergisch Gladbach');

  });

  it('should search cities by whole word', () => {
    const results = service.searchCities('Ham', 'whole', 1, 5);
    expect(results.totalCount).toBe(2);
    expect(results.cities[0].cityName).toEqual('Hamburg');
    expect(results.cities[1].cityName).toEqual('Hamm');

  });

  it('should return paginated results', () => {
    const results = service.searchCities('a', 'whole', 2, 2);
    expect(results.totalCount).toBeGreaterThan(2);
    expect(results.cities.length).toBe(2);
  });

  it('should return no results for non-matching query', () => {
    const results = service.searchCities('xyz', 'beginning', 1, 5);
    expect(results.totalCount).toBe(0);
  });
});
