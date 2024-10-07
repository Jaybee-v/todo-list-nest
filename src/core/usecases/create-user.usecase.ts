import { UserRepositoryOrm } from 'src/infrastructure/database/repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import { forwardRef, Inject } from '@nestjs/common';

export class CreateUserUseCase {
  constructor(
    @Inject(forwardRef(() => UserRepositoryOrm))
    private userRepository: UserRepositoryOrm,
  ) {
    console.log('UserRepositoryCreate:', this.userRepository);
  }

  async execute(username: string, password: string): Promise<User> {
    const user = new User(username, password);
    return this.userRepository.save(user);
  }
}
