import { HashService } from 'src/infrastructure/utils/hash.service';

describe('HashService', () => {
  let hashService: HashService;

  beforeEach(() => {
    hashService = new HashService();
  });

  it('should hash a password', async () => {
    const password = 'password';
    const hashedPassword = await hashService.hashPassword(password);
    expect(hashedPassword).not.toEqual(password);
  });

  it('should compare passwords', async () => {
    const password = 'password';
    const hashedPassword = await hashService.hashPassword(password);
    const isPasswordCorrect = await hashService.comparePasswords(
      password,
      hashedPassword,
    );
    expect(isPasswordCorrect).toBe(true);
  });
});
