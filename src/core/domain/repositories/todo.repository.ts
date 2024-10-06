import { Todo } from '../entities/todo.entity';

export interface TodoRepository {
  save(todo: Todo): Promise<Todo>;
  findAll(): Promise<Todo[]>;
  findById(id: number): Promise<Todo>;
}
