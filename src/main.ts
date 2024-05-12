import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 7001
  app.enableCors()
  await app.listen(PORT,() => console.log(`Server is running on PORT: ${PORT}`))
}
bootstrap();
