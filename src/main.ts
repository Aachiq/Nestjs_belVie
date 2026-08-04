import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.NODE_ENV);

  // Either use a fallback like || 3000 or use ! if surely port not undefined
  await app.listen(process.env.PORT!);
}
bootstrap();
