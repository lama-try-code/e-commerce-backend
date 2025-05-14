import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../database/postgres/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) { }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }
}