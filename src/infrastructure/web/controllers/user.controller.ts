import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/core/usecases/create-user.usecase';

@Controller('users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    console.log('UserController');
  }

  @Post()
  async createUser(@Body() body: { username: string; password: string }) {
    console.log('Body:', body);

    console.log('Creating user with username:', body.username);
    const newUser = await this.createUserUseCase.execute(
      body.username,
      body.password,
    );
    console.log('User created:', newUser);
    return {
      message: 'User created successfully',
    };
  }
}
