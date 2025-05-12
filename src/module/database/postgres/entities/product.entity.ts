import { IsBoolean, IsInt, IsString } from "class-validator";
import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderdetail.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @IsString()
    @Column()
    name: string;

    @IsString()
    @Column()
    description: string;

    @IsBoolean()
    @Column({ default: true })
    isActive: boolean;

    @Column()
    price: number;

    @IsInt()
    @Column({ default: 0 })
    quantity: number;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}