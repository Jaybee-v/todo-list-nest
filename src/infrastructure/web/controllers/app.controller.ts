import { Controller, Get, Render } from '@nestjs/common';
import { FindAllUsersUseCase } from 'src/core/usecases/find-all-users.usecase';

@Controller()
export class AppController {
  constructor(private findAllUsersUseCase: FindAllUsersUseCase) {
    console.log('AppController');
  }

  @Get()
  @Render('home')
  async render() {
    const users = await this.findAllUsersUseCase.execute();
    return { users };
  }
}
