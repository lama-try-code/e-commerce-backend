import { IsBoolean, IsInt, IsString } from "class-validator";
import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderdetail.entity";
import { createUnionType, Directive, Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { ProductStatus } from "src/common/constants/product-status.enum";

@ObjectType()
@Entity('products')
@Directive('@cacheControl(maxAge: 60)')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: UUID;

    @IsString()
    @Column()
    @Field(() => String)
    name: string;

    @IsString()
    @Column()
    @Field(() => String)
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    @Field(() => Float)
    price: number;

    @IsInt()
    @Column({ default: 0 })
    @Field(() => Int)
    quantity: number;

    @IsBoolean()
    @Column({ default: true })
    @Field(() => Boolean)
    isActive: boolean;

    //this is how you set a enum type in typeorm
    @Column({type: 'enum', enum: ProductStatus, default: ProductStatus.IN_STOCK})
    @Field(() => ProductStatus)
    status: ProductStatus;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}

@ObjectType()
export class ProductResponse {
    
    @Field(() => String)
    message: string;
}

export const ProductUnionResult = createUnionType({
    name: 'ProductUnionResult',
    types: () => [Product, ProductResponse] as const,
    // The resolveType function is used to determine which type to use for the union
    // based on the value returned from the resolver.
    resolveType: (value) => {
        if(value instanceof Product) {
            return Product;
        }
        if('message' in value) {
            return ProductResponse;
        }
    }
})
