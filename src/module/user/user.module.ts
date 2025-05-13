import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserService } from "./user.service";
import { UserProviders } from "./user.providers";
import { UserController } from "./user.controller";
import { CartModule } from "../cart/cart.module";

//có import user controller và user service ở module rồi thì không cần import lại ở app module 
@Module({
    imports: [DatabaseModule, CartModule],
    providers: [
        UserService,
        ...UserProviders,
    ],
    controllers: [UserController],
    exports: [
        UserService,
    ],
})
export class UserModule {}