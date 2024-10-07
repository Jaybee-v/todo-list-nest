import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { CompleteTodoUseCase } from 'src/core/usecases/complete-todo.usecase';
import { CreateTodoUseCase } from 'src/core/usecases/create-todo.usecase';
import { FindAllTodosUseCase } from 'src/core/usecases/find-all-todos.usecase';

@Controller('todos')
export class TodosController {
  constructor(
    private createTodoUseCase: CreateTodoUseCase,
    private findAllTodosUseCase: FindAllTodosUseCase,
    private completeTodoUseCase: CompleteTodoUseCase,
  ) {}

  @Get()
  @Render('todos')
  async render() {
    const todos = await this.findAllTodosUseCase.execute();
    return { todos };
  }

  @Post()
  @Redirect('/todos')
  async addTodo(@Body('title') title: string) {
    console.log('Adding todo with title:', title);
    const newTodo = await this.createTodoUseCase.execute(title);
    console.log('Todo added:', newTodo);
    return {
      message: 'Todo added successfully',
    };
  }

  @Post('/:id/complete')
  @Redirect('/todos')
  async completeTodo(@Param('id') id: number) {
    // Complete todo
    await this.completeTodoUseCase.execute(id);
    return {
      message: 'Todo completed successfully',
    };
  }
}
