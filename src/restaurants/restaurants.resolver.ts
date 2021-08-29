import { Resolver, Query, Field } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  @Query((returns) => Restaurant)
  restaurants(): Restaurant[] {
    return [];
  }
}
