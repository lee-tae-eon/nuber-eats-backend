/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, OmitType } from '@nestjs/graphql';

import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
