import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { BooksModule } from './books/books.module';
import {UsersModule} from "./modules/user/user.module";
import {HotelModel} from "./modules/hotel/models/hotel.model";
import {ReservationModule} from "./modules/reservation/reservation.module";
import {SupportModule} from "./modules/support/support.module";


@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.URL_DB),
      BooksModule,
      UsersModule,
      HotelModel,
      ReservationModule,
      SupportModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
