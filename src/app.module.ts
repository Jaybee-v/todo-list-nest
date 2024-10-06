import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './infrastructure/web/modules/todos.module';
import { TodoOrmEntity } from './infrastructure/database/entities/todo.orm-entity';

@Module({
  imports: [
    TodosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'todo_user',
      password: 'todo_pass',
      database: 'todo_db',
      entities: [TodoOrmEntity],
      synchronize: true, // Ne pas utiliser en production
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
