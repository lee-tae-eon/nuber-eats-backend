import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dtos/create-restaurant.dto';

import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  createRestaurant(
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantInput);
    return this.restaurants.save(newRestaurant);
  }
}
