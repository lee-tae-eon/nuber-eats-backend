import { Field } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createAt: Date;

  @CreateDateColumn()
  @Field((type) => Date)
  updated: Date;
}
