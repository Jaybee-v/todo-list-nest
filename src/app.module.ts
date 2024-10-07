import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './infrastructure/web/modules/todos.module';
import { TodoOrmEntity } from './infrastructure/database/entities/todo.orm-entity';
import { AppController } from './infrastructure/web/controllers/app.controller';
import { UsersModule } from './infrastructure/web/modules/users.module';
import { UserOrmEntity } from './infrastructure/database/entities/user.orm-entity';

@Module({
  imports: [
    TodosModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'todo_user',
      password: 'todo_pass',
      database: 'todo_db',
      entities: [TodoOrmEntity, UserOrmEntity],
      synchronize: true, // Ne pas utiliser en production
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
