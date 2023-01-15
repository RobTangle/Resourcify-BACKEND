import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
const morgan = require('morgan');
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const PORT = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // #1
  app.use(morgan('common'));
  app.use(helmet()); //#2
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true // #3
      forbidNonWhitelisted: false,
      disableErrorMessages:
        process.env.NODE_ENV === 'PRODUCTION' ? true : false,
    }),
  );

  const config = new DocumentBuilder() // #4
    .setTitle('Resourcify API')
    .setDescription('API for the Resourcify App')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // #5
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
}
bootstrap();

//# 1 Acepta opciones que pueden venir bien para usar si da problemas CORS.
// #2 When using fastify and helmet, there may be a problem with CSP, to solve this collision, configure the CSP as shown below: (ver docu en https://docs.nestjs.com/openapi/introduction)
// #3 intenta transformar el input a el tipo de dato que le indicamos en la ruta que esperamos que sea. Excelente!
// #4 Configuración para Swagger
// #5  This name here is important for matching up with @ApiBearerAuth() in your controller!
