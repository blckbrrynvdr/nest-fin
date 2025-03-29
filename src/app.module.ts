import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { BooksModule } from './books/books.module';
import {UsersModule} from "./modules/base/user/user.module";
import {SupportModule} from "./modules/base/support/support.module";
import {ReservationModule} from "./modules/base/reservation/reservation.module";
import {HotelApiModule} from "./modules/api/hotel/hotel.module";
import {AuthModule} from "./modules/api/auth/auth.module";
import {ReservationApiModule} from "./modules/api/reservation/reservation.module";


@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.URL_DB),
      HotelApiModule,
      ReservationApiModule,
      AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
