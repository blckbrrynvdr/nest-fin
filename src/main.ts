import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import {SessionAdapter} from "./session-adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionMiddleware = session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }
  });
  
  // Настройка CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  app.use(cookieParser());
  app.use(sessionMiddleware);
  app.use(passport.initialize())
  app.use(passport.session())
  app.useWebSocketAdapter(new SessionAdapter(sessionMiddleware, app));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
