import { Todo } from 'src/core/domain/entities/todo.entity';
import { FindAllTodosUseCase } from 'src/core/usecases/find-all-todos.usecase';
import { TodoRepositoryOrm } from 'src/infrastructure/database/repositories/todo.repository';

describe('FindAllTodos', () => {
  let todoRepository: TodoRepositoryOrm;
  let findAllTodosUseCase: FindAllTodosUseCase;

  beforeEach(() => {
    todoRepository = {
      findAll: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as TodoRepositoryOrm; // Création d'un mock pour TodoRepository

    findAllTodosUseCase = new FindAllTodosUseCase(todoRepository);
  });

  it('should return all todos', async () => {
    const todo1 = new Todo('Test Todo 1');
    const todo2 = new Todo('Test Todo 2');

    (todoRepository.findAll as jest.Mock).mockResolvedValue([todo1, todo2]);

    const todos = await findAllTodosUseCase.execute();

    expect(todos).toEqual([todo1, todo2]);
    expect(todoRepository.findAll).toHaveBeenCalled();
  });
});
