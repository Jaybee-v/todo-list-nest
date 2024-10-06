import { TodoRepositoryOrm } from 'src/infrastructure/database/repositories/todo.repository';
import { Todo } from '../domain/entities/todo.entity';
import { forwardRef, Inject } from '@nestjs/common';

export class CreateTodoUseCase {
  constructor(
    @Inject(forwardRef(() => TodoRepositoryOrm))
    private todoRepository: TodoRepositoryOrm,
  ) {
    console.log('TodoRepositoryCreate:', this.todoRepository);
  }

  async execute(title: string): Promise<Todo> {
    const todo = new Todo(title);
    return this.todoRepository.save(todo);
  }
}
