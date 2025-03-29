import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 3600000 }
  //   })
  // );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
