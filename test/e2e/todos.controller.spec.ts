import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('TodosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /todos should return all todos', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
