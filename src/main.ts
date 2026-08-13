import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.NODE_ENV);

  app.useGlobalPipes(
    new ValidationPipe(),
  );

  // Either use a fallback like || 3000 or use ! if surely port not undefined
  await app.listen(process.env.PORT!);
}
bootstrap();
