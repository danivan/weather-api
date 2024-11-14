import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async current(
    @Query('units') units: string,
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ) {
    return this.weatherService.getWeather({ units, lat, lon });
  }

  @Get('yesterday')
  async yesterday(
    @Query('units') units: string,
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ) {
    return this.weatherService.getYesterdayWeather({ units, lat, lon });
  }
}
