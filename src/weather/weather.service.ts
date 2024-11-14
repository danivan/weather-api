import { Injectable } from '@nestjs/common';
import { WeatherDto } from './dto/weather.dto';

@Injectable()
export class WeatherService {
  async getWeather({ units, lat, lon }: WeatherDto) {
    if (!process.env.OPENWEATHER_URL || !process.env.OPENWEATHER_APIKEY) {
      console.log(process.env.OPENWEATHER_URL);
      console.log(process.env.OPENWEATHER_APIKEY);
      return;
    }
    const url = new URL(process.env.OPENWEATHER_URL);
    url.search = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      units,
      exclude: 'minutely',
      appid: process.env.OPENWEATHER_APIKEY,
    }).toString();

    const result = await fetch(url, {
      method: 'GET',
    });

    return result.json();
  }

  async getYesterdayWeather({ units, lat, lon }: WeatherDto) {
    if (
      !process.env.OPENWEATHER_TIME_MACHINE_URL ||
      !process.env.OPENWEATHER_APIKEY
    ) {
      return;
    }
    const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
    const yesterdayMs = Math.floor(yesterday.getTime() / 1000);

    const url = new URL(process.env.OPENWEATHER_TIME_MACHINE_URL);
    url.search = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      dt: yesterdayMs.toString(),
      units,
      exclude: 'minutely',
      appid: process.env.OPENWEATHER_APIKEY,
    }).toString();

    const result = await fetch(url, {
      method: 'GET',
    });

    return result.json();
  }
}
