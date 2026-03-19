import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';

export async function createApp() {
  const app = await NestFactory.create(AppModule, { logger: false });

  // ✅ CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ✅ Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.init(); // 👈 IMPORTANT for Lambda

  return app;
}
