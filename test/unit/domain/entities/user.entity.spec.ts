import { User } from 'src/core/domain/entities/user.entity';

describe('User Entity', () => {
  it('should create a user with a username', () => {
    const username = 'nswebdev';
    const password = 'password';
    const user = new User(username, password);
    console.log('NEW USER', user);

    expect(user.username).toBe(username);
  });

  it('should throw an error if username is empty', () => {
    const password = 'password';
    expect(() => new User('', password)).toThrow("Username can't be empty");
  });

  it('user should be created with a password', () => {
    const username = 'nswebdev';
    const password = 'password';
    const user = new User(username, password);

    expect(user.password).toBe(password);
  });

  it('should throw an error if password is empty', () => {
    const username = 'nswebdev';
    expect(() => new User(username, '')).toThrow("Password can't be empty");
  });
});
