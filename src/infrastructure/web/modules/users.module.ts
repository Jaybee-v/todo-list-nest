import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.controller';
import { CreateUserUseCase } from 'src/core/usecases/create-user.usecase';
import { UserRepositoryOrm } from 'src/infrastructure/database/repositories/user.repository';
import { FindAllUsersUseCase } from 'src/core/usecases/find-all-users.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from 'src/infrastructure/database/entities/user.orm-entity';
import { HashService } from 'src/infrastructure/utils/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UserRepositoryOrm,
    FindAllUsersUseCase,
    HashService,
  ],
  exports: [UserRepositoryOrm, FindAllUsersUseCase],
})
export class UsersModule {}
