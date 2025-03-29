import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }
    })
  );
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
