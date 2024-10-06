import { Injectable } from '@nestjs/common';
import { Todo } from '../domain/entities/todo.entity';
import { TodoRepository } from '../domain/repositories/todo.repository';

@Injectable()
export class FindByIdUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number): Promise<Todo> {
    return this.todoRepository.findById(id);
  }
}
