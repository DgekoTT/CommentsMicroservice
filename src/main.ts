import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT|| 5000;
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
      origin: "http://localhost:3000",
      credentials: true,// отвечает за куки
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 200
  });
  
  const config = new DocumentBuilder()
    .setTitle('Comments microservice')
    .setDescription('Описание  API комментариев')
    .setVersion('1.0')
    .build()
 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.use(cookieParser());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
