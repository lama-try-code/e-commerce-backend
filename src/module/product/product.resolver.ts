import { Resolver, Query } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product } from "../database/postgres/entities/product.entity";
import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";

@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private productService: ProductService,
    ) {}

    @Query(() => [Product])
    async getProducts() :Promise<Product[]> {
        return this.productService.getAllProducts();
    }
}