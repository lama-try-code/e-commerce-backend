import { IsInt } from "class-validator";
import { Column, Entity, ForeignKey, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderDetail {
    @PrimaryColumn()
    orderId: string;

    @PrimaryColumn()
    productId: string;

    @Column() 
    price: number;

    @IsInt()
    @Column()
    quantity: number;

    @ManyToOne(() => Order, (order) => order.id)
    order: Order;

    @ManyToOne(() => Product, (product) => product.id)
    product: OrderDetail;
}