import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../database/postgres/entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) { }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async createProduct(CreateProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(CreateProductDto);
        return this.productRepository.save(product);
    }
}