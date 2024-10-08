import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './Guards/Authorization';
const port = process.env.PORT || 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new RolesGuard())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port);
}
bootstrap();
