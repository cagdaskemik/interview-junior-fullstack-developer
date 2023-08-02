import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './app.controller';
import { CityService } from './app.service';

describe('AppController', () => {
  let appController: CityController;
  let service: CityService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService],
    }).compile();

    appController = app.get<CityController>(CityController);
    service = app.get<CityService>(CityService); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call searchCities method with correct parameters', () => {
    const spy = jest.spyOn(service, 'searchCities');
    appController.searchCities('Berlin', 'beginning', '1', '5');
    expect(spy).toHaveBeenCalledWith('Berlin', 'beginning', 1, 5);
  });

});
