import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModel, UserSchema} from "./models/user.model";
import {UsersController} from "./user.controller";
import {UsersRepository} from "./repositories/user.repository";
import {UsersService} from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService],
})
export class UsersModule {}
