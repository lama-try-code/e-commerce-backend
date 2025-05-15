import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product } from "../database/postgres/entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";

@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private productService: ProductService,
    ) {}

    @Query(() => [Product])
    async getProducts() :Promise<Product[]> {
        return this.productService.getAllProducts();
    }

    @Mutation(() => Product)
    async createProduct(@Args({name:'product', type: () => CreateProductDto}) product:CreateProductDto) :Promise<Product> {
        return this.productService.createProduct(product);
    }
}