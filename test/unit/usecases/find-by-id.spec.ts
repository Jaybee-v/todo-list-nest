import { Todo } from 'src/core/domain/entities/todo.entity';
import { TodoRepository } from 'src/core/domain/repositories/todo.repository';
import { FindByIdUseCase } from 'src/core/usecases/find-by-id.usecase';

describe('FindByIdTodo', () => {
  let todoRepository: TodoRepository;
  let findByIdTodo: FindByIdUseCase;

  beforeEach(() => {
    todoRepository = {
      findById: jest.fn(),
    } as unknown as TodoRepository;
    findByIdTodo = new FindByIdUseCase(todoRepository);
  });

  it('should return a todo by id', async () => {
    const todo = new Todo('Test Todo');
    todoRepository.findById = jest.fn().mockResolvedValue(todo);

    const result = await findByIdTodo.execute(1);

    expect(result).toEqual(todo);
    expect(todoRepository.findById).toHaveBeenCalledWith(1);
  });
});
