/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { CoreEntity } from 'src/common/entities/core.entity';
import { Category } from './category.entitiy';
import { User } from 'src/users/entities/user.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String, { defaultValue: '강남' })
  @Column()
  @IsString()
  address: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  owner: User;
}
