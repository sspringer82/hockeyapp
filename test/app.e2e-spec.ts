import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => app);

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/team/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/team/1')
      .expect(200)
      .expect({
        id: 1,
        name: 'Red Bull München',
        logo: '4065353fc3a56ac21789d75c8f187fad.png',
      });
  });
});
