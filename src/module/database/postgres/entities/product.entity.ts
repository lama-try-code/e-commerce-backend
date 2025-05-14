import { IsBoolean, IsInt, IsString } from "class-validator";
import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderdetail.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

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

    @Column({default: 'OUT_OF_STOCK'})
    @Field(() => String)
    status: string;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}