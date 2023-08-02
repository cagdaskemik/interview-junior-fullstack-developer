import { Module } from '@nestjs/common';
import { CityController } from './app.controller';
import { CityService } from './app.service';

@Module({
  imports: [],
  controllers: [CityController],
  providers: [CityService],
})

export class AppModule {}
