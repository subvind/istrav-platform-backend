import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

let port = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
