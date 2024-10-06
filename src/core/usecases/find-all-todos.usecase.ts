import { Injectable } from '@nestjs/common';
import { Todo } from '../domain/entities/todo.entity';
import { TodoRepositoryOrm } from 'src/infrastructure/database/repositories/todo.repository';

@Injectable()
export class FindAllTodosUseCase {
  constructor(private todoRepository: TodoRepositoryOrm) {
    console.log('FindAllTodosRepo', this.todoRepository);
  }

  async execute(): Promise<Todo[]> {
    console.log(this.todoRepository);
    return this.todoRepository.findAll();
  }
}
