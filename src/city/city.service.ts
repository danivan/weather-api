import { HttpException, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
  ) {}
  async create(createCityDto: CreateCityDto, user: User) {
    const city = this.cityRepository.create({
      userId: user.id,
      ...createCityDto,
    });
    return this.cityRepository.save(city);
  }

  async findAllByUser(userId: number) {
    return this.cityRepository.findBy({ userId });
  }

  async findOne(id: number) {
    return this.cityRepository.findOneBy({ id });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.cityRepository.findOneBy({ id });

    if (!city) {
      throw new HttpException('City not found', 404);
    }

    return this.cityRepository.update(id, updateCityDto);
  }

  remove(id: number) {
    return this.cityRepository.delete(id);
  }
}
