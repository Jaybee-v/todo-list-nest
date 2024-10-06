import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoOrmEntity } from 'src/infrastructure/database/entities/todo.orm-entity';
import { TodosController } from '../controllers/todo.controller';
import { FindAllTodosUseCase } from 'src/core/usecases/find-all-todos.usecase';
import { TodoRepositoryOrm } from 'src/infrastructure/database/repositories/todo.repository';
import { CreateTodoUseCase } from 'src/core/usecases/create-todo.usecase';
import { CompleteTodoUseCase } from 'src/core/usecases/complete-todo.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoOrmEntity]), // Assure-toi que TypeOrm est configuré
  ],
  controllers: [TodosController],
  providers: [
    TodoRepositoryOrm,
    FindAllTodosUseCase,
    CreateTodoUseCase,
    CompleteTodoUseCase,
  ],
  exports: [TodoRepositoryOrm],
})
export class TodosModule {}
