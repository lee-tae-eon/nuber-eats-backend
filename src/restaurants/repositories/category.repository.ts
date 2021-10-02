import { Entity, EntityRepository, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(User)
export class UserRepositry extends Repository<User> {
  fin;
}
