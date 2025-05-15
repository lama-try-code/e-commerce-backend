import { IsBoolean, IsInt, IsString } from "class-validator";
import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderdetail.entity";
import { createUnionType, Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { ProductStatus } from "src/common/constants/product-status.enum";

@ObjectType()
@Entity('products')
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

    @IsBoolean()
    @Column({ default: true })
    @Field(() => Boolean)
    isActive: boolean;

    @Column()
    @Field(() => Float)
    price: number;

    @IsInt()
    @Column({ default: 0 })
    @Field(() => Int)
    quantity: number;

    //this is how you set a enum type in typeorm
    @Column({type: 'enum', enum: ProductStatus, default: ProductStatus.IN_STOCK})
    @Field(() => ProductStatus)
    status: ProductStatus;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}
