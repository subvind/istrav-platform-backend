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
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  // await app.register(secureSession, {
  //   secret: 'adckjcjabjasbjascbljcjsbajahssavdscdeas', // must be bigger than 32 char
  //   salt: 'mq32DxBVjjspDR60',
  // });

  
  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  // app.use(
  //   session({
  //     secret: 'my-secret-community_folder-session-key',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

