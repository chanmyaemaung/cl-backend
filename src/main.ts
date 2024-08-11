import { AppConfiguration, corsOptions } from '@/lib';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors(corsOptions);

  // Disable the X-Powered-By header
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Cookie parser
  app.use(cookieParser());

  // Get the port from the configuration
  const configService =
    app.get<ConfigService<AppConfiguration, true>>(ConfigService);
  const port = configService.get('port', { infer: true });

  await app.listen(port, () => {
    logger.log(`Server is running at http://localhost:${port}`);
    logger.log(
      `Application is running in ${configService.get('nodeEnv', { infer: true })} mode`,
    );
  });
}
bootstrap();
