import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CartProviders } from "./cart.providers";
import { CartService } from "./cart.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers:[
        CartService,
        ...CartProviders,
    ],
    exports: [CartService],
})
export class CartModule {}