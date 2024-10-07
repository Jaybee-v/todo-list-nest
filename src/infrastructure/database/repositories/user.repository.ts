import { User } from 'src/core/domain/entities/user.entity';
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { HashService } from 'src/infrastructure/utils/hash.service';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepository: Repository<UserOrmEntity>,
    private hashService: HashService,
  ) {}

  async save(user: User): Promise<User> {
    const userOrm = await this.toOrmEntity(user);
    const savedUserOrm = await this.ormRepository.save(userOrm);
    return this.toDomainEntity(savedUserOrm);
  }

  async findAll(): Promise<User[]> {
    const usersOrm = await this.ormRepository.find();
    const users = usersOrm.map((userOrm) => this.toDomainEntity(userOrm));
    return users;
  }

  private async toOrmEntity(user: User): Promise<UserOrmEntity> {
    const userOrm = new UserOrmEntity();
    userOrm.id = user.id;
    userOrm.username = user.username;
    userOrm.password = await this.hashService.hashPassword(user.password);
    return userOrm;
  }

  private toDomainEntity(userOrm: UserOrmEntity): User {
    const user = new User(userOrm.username, userOrm.password);
    user.id = userOrm.id;
    return user;
  }
}
