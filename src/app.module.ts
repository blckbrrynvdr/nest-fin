import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {UsersApiModule} from "./modules/api/users/users.module";
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
      UsersApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
