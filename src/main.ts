import { NestFactory } from '@nestjs/core';
import {} from '@nestjs/platform-fastify'
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

import * as session from 'express-session';
import secureSession from 'fastify-secure-session';

import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'

let port = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  
  
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

