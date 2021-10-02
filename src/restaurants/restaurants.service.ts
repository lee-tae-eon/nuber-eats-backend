import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import { Category } from './entities/category.entity';

import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepositry } from './repositories/category.repository';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly categories: CategoryRepositry,
  ) {}

  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.categories.findOne({ slug: categorySlug });
    if (!category) {
      category = await this.categories.save(
        this.categories.create({ slug: categorySlug, name: categoryName }),
      );
    }
    return category;
  }

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );

      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'could not create restaurant',
      };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaunrantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    const restaurant = await this.restaurants.findOne(
      editRestaunrantInput.restaurantId,
    );
    if (!restaurant) {
      return {
        ok: false,
        error: '레스토랑이 없습니다.',
      };
    }
    if (owner.id !== restaurant.ownerId) {
      return {
        ok: false,
        error: 'you cant edit a restaurant that you dont own',
      };
    }
    let category: Category = null;
    if (editRestaunrantInput.categoryName) {
      category = await this.categories.getOrCreate(
        editRestaunrantInput.categoryName,
      );
    }
    await this.restaurants.save([
      {
        id: editRestaunrantInput.restaurantId,
        ...editRestaunrantInput,
        ...(category && { category }),
      },
    ]);
    return {
      ok: true,
    };
  }
}
