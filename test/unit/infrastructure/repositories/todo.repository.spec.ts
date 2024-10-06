import { Todo } from 'src/core/domain/entities/todo.entity';
import { TodoOrmEntity } from 'src/infrastructure/database/entities/todo.orm-entity';
import { TodoRepositoryOrm } from 'src/infrastructure/database/repositories/todo.repository';
import { Repository } from 'typeorm';

describe('TodoRepository', () => {
  let todoRepository: TodoRepositoryOrm;
  let ormRepository: Partial<Repository<TodoOrmEntity>>;
  beforeEach(() => {
    ormRepository = {
      save: jest.fn().mockImplementation((todo) => Promise.resolve(todo)),
      findOne: jest.fn().mockImplementation(({ where }) => {
        // Ici, on peut mocker le comportement de findOne
        if (where.id === 1) {
          return Promise.resolve({
            id: 1,
            title: 'Test Todo',
            completed: false,
            created_at: new Date().toISOString().split('T')[0],
          });
        }
        return Promise.resolve(null);
      }),
      find: jest.fn().mockImplementation(() => {
        // Retourner un tableau de TodoOrmEntity pour le test
        return Promise.resolve([
          {
            id: 1,
            title: 'Test Todo 1',
            completed: false,
            created_at: new Date().toISOString().split('T')[0],
          },
          {
            id: 2,
            title: 'Test Todo 2',
            completed: false,
            created_at: new Date().toISOString().split('T')[0],
          },
        ]);
      }),
    };

    // On instancie le repository avec le mock
    todoRepository = new TodoRepositoryOrm(
      ormRepository as Repository<TodoOrmEntity>,
    );
  });

  it('should save a todo', async () => {
    const todo = new Todo('Test Todo');
    const savedTodo = await todoRepository.save(todo);
    expect(savedTodo.title).toEqual('Test Todo');
  });

  it('should return all todos', async () => {
    const todo1 = new Todo('Test Todo 1');
    const todo2 = new Todo('Test Todo 2');
    await todoRepository.save(todo1);
    await todoRepository.save(todo2);
    const todos = await todoRepository.findAll();
    console.log(todos);

    expect(todos).toEqual([
      expect.objectContaining({
        title: todo1.title,
        completed: todo1.completed,
        created_at: todo1.created_at,
      }),
      expect.objectContaining({
        title: todo2.title,
        completed: todo2.completed,
        created_at: todo2.created_at,
      }),
    ]);
  });

  it('should find a todo by id', async () => {
    const foundTodo = await todoRepository.findById(1);
    expect(foundTodo).not.toBeNull();
    expect(foundTodo.title).toBe('Test Todo');
  });

  it('should throw an error if todo is not found', async () => {
    await expect(todoRepository.findById(999)).rejects.toThrow(
      'Todo not found',
    );
  });
});
