import { UserRepositoryOrm } from 'src/infrastructure/database/repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import { forwardRef, Inject } from '@nestjs/common';

export class FindAllUsersUseCase {
  constructor(
    @Inject(forwardRef(() => UserRepositoryOrm))
    private userRepository: UserRepositoryOrm,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
