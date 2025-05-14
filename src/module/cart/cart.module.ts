import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CartProviders } from "./cart.providers";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [CartController],
    providers:[
        CartService,
        ...CartProviders,
    ],
    exports: [CartService],
})
export class CartModule {}