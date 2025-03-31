import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./models/user";
import {UsersService} from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
