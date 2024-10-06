import { Injectable } from '@nestjs/common';
import { Todo } from 'src/core/domain/entities/todo.entity';
import { TodoRepository } from 'src/core/domain/repositories/todo.repository';
import { TodoOrmEntity } from '../entities/todo.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoRepositoryOrm implements TodoRepository {
  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly ormRepository: Repository<TodoOrmEntity>,
  ) {}

  async save(todo: Todo): Promise<Todo> {
    const todoOrm = this.toOrmEntity(todo);
    const savedTodoOrm = await this.ormRepository.save(todoOrm);

    return this.toDomainEntity(savedTodoOrm);
  }

  async findAll(): Promise<Todo[]> {
    const todosOrm = await this.ormRepository.find();
    const todos = todosOrm.map((todoOrm) => this.toDomainEntity(todoOrm));
    return todos;
  }

  async findById(id: number): Promise<Todo> {
    const todoOrm = await this.ormRepository.findOne({ where: { id } });
    if (!todoOrm) {
      throw new Error('Todo not found');
    }
    return this.toDomainEntity(todoOrm);
  }

  // Méthodes pour convertir entre le domaine et l'entité ORM
  private toOrmEntity(todo: Todo): TodoOrmEntity {
    const todoOrm = new TodoOrmEntity();
    todoOrm.id = todo.id;
    todoOrm.title = todo.title;
    todoOrm.completed = todo.completed;
    todoOrm.created_at = new Date(todo.created_at);
    return todoOrm;
  }

  private toDomainEntity(todoOrm: TodoOrmEntity): Todo {
    const todo = new Todo(todoOrm.title);
    todo.id = todoOrm.id;
    todo.completed = todoOrm.completed;
    todo.created_at = new Date(todoOrm.created_at).toISOString().split('T')[0];
    return todo;
  }
}
