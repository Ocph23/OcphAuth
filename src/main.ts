import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true
}
//app.use(cors(options))
app.enableCors(cors)
  const options = new DocumentBuilder()
  .setTitle('Stimik Auth App')
  .setDescription('Stimik Auth')
  .setVersion('1.0')
  .addTag('Auth')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
