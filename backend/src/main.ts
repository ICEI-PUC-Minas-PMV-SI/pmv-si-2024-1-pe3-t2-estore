import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const logger = new Logger('Facul:');
  const config = new DocumentBuilder()
    .setTitle('FACUL')
    .setDescription('FACUL')
    .setVersion('1.0')
    .addTag('FACUL')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, () => {
    logger.verbose(`[BACK-END] EM [ http://localhost:${process.env.PORT} ]`);
    logger.verbose(`[BANCO] -> [ http://172.19.192.1:5555 ]`);
    logger.verbose(
      `[DOCUMENTAÇAO] -> [ http://localhost:${process.env.PORT}/api ]`,
    );
  });
}
bootstrap();
