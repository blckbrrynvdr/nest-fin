import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { BooksModule } from './books/books.module';
import {UsersModule} from "./modules/base/user/user.module";
import {SupportModule} from "./modules/base/support/support.module";
import {ReservationModule} from "./modules/base/reservation/reservation.module";
import {HotelApiModule} from "./modules/api/hotel/hotel.module";
import {HotelModel} from "./modules/base/hotel/models/hotel.model";


@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.URL_DB),
      BooksModule,
      UsersModule,
      // HotelModel,
      ReservationModule,
      SupportModule,
      HotelApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
