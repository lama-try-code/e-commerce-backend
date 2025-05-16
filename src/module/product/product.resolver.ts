import { Resolver, Query, Mutation, Args, Subscription } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product, ProductUnionResult } from "../database/postgres/entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UUID } from "crypto";
import { PubSub } from "graphql-subscriptions";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/common/guards/gql.guard";

const pubSub = new PubSub();

@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private productService: ProductService,
    ) {}

    //works like a event emitter
    //when a new product is created, it will emit an event
    //and all the subscribers will be notified
    //this is how you can use subscriptions in graphql
    //remember: this is websocket based
    @Subscription(() => Product)
    newProduct() {
        return pubSub.asyncIterableIterator('newProduct');
    }


    @Query(() => [Product])
    @UseGuards(GqlAuthGuard)
    async getProducts():Promise<Product[]> {
       return this.productService.getAllProducts();
    }

    @Query(returns => ProductUnionResult)
    //please remember to set the faqing header http authorization
    @UseGuards(GqlAuthGuard)
    async searchProduct(@Args('id') id: UUID):Promise<typeof ProductUnionResult> {
        const product = await this.productService.getProductById(id);
        if(!product) {
            return {
                message: 'Product not found',
            };
        }
        return product;
    }

    @Mutation(() => ProductUnionResult)
    @UseGuards(GqlAuthGuard)
    async createProduct(@Args('product') product:CreateProductDto) :Promise<typeof ProductUnionResult> {
        const result = this.productService.createProduct(product);
        pubSub.publish('newProduct', { newProduct: result });
        return result;
    }
}