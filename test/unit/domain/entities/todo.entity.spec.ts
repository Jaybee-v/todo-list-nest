import { Todo } from 'src/core/domain/entities/todo.entity';

describe('Todo Entity', () => {
  it('should create a todo with a title', () => {
    const title = 'Mon premier Todo';
    const todo = new Todo(title);

    expect(todo.title).toBe(title);
  });

  it('should be created as not completed', () => {
    const title = 'Todo non terminé';
    const todo = new Todo(title);

    expect(todo.completed).toBe(false);
  });

  it('should throw an error if title is empty', () => {
    expect(() => new Todo('')).toThrow("Title can't be empty");
  });

  it('should be created today if no date is provided', () => {
    const title = 'Todo sans date';
    const todo = new Todo(title);
    console.log(todo);

    expect(todo.created_at).toBe(new Date().toISOString().split('T')[0]);
  });
});
