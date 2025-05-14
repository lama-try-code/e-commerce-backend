import { Module } from "@nestjs/common";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";
import { ProductProviders } from "./product.provider";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...ProductProviders, 
        ProductService,
        ProductResolver,
    ]
})

export class ProductModule {}