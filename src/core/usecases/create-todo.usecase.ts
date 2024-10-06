import { Todo } from '../domain/entities/todo.entity';
import { TodoRepository } from '../domain/repositories/todo.repository';

export class CreateTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(title: string): Promise<Todo> {
    const _title = title.trim();
    const todo = new Todo(_title);
    return this.todoRepository.save(todo);
  }
}
