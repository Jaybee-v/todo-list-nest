import { Controller, Get, Render } from '@nestjs/common';
// import { CreateTodoUseCase } from 'src/core/usecases/create-todo.usecase';
import { FindAllTodosUseCase } from 'src/core/usecases/find-all-todos.usecase';

@Controller('todos')
export class TodosController {
  constructor(
    // private createTodoUseCase: CreateTodoUseCase,
    private findAllTodosUseCase: FindAllTodosUseCase,
  ) {}

  @Get()
  @Render('todos')
  async render() {
    const todos = await this.findAllTodosUseCase.execute();
    return { todos };
  }
}
