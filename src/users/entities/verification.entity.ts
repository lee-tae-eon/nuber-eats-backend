import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@InputType()
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field((type) => String)
  code: string;
}
