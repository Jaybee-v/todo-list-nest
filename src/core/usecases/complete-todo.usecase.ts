import { forwardRef, Inject } from '@nestjs/common';
import { TodoRepositoryOrm } from 'src/infrastructure/database/repositories/todo.repository';

export class CompleteTodoUseCase {
  constructor(
    @Inject(forwardRef(() => TodoRepositoryOrm))
    private todoRepository: TodoRepositoryOrm,
  ) {}

  async execute(id: number) {
    return this.todoRepository.complete(id);
  }
}
