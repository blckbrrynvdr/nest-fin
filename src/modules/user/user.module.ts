import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModel, UserSchema} from "./models/user.model";
import {UsersController} from "./user.controller";
import {UsersService} from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
