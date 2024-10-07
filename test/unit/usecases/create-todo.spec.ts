import { Todo } from 'src/core/domain/entities/todo.entity';
import { CreateTodoUseCase } from 'src/core/usecases/create-todo.usecase';
import { TodoRepositoryOrm } from 'src/infrastructure/database/repositories/todo.repository';

describe('CreateTodo', () => {
  let todoRepository: Partial<TodoRepositoryOrm>;
  let createTodo: CreateTodoUseCase;

  beforeEach(() => {
    todoRepository = {
      save: jest.fn(),
    };
    createTodo = new CreateTodoUseCase(todoRepository as TodoRepositoryOrm);
  });

  it('should create a todo', async () => {
    const todo = new Todo('Test Todo');
    todoRepository.save = jest.fn().mockResolvedValue(todo);

    const result = await createTodo.execute('Test Todo');

    expect(result).toEqual(todo);
    expect(todoRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Test Todo' }),
    );
  });

  it('should throw an error if title is empty', async () => {
    await expect(createTodo.execute('')).rejects.toThrow(
      "Title can't be empty",
    );
  });
});
