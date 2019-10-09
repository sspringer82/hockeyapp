import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HockeyLogger } from './logger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { readFileSync } from 'fs';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastify from 'fastify';

const f = fastify({
  http2: true,
  https: {
    key: readFileSync(join(__dirname, '..', 'cert', 'key.pem')),
    cert: readFileSync(join(__dirname, '..', 'cert', 'cert.pem')),
  },
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(f),
    {
      logger: new HockeyLogger(),
    },
  );

  app.setViewEngine({
    engine: {
      ejs: require('ejs'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  const options = new DocumentBuilder()
    .setTitle('Hockey Application')
    .setDescription('The hockey API description')
    .setVersion('1.0')
    .addTag('hockey')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
