import { UUID } from "crypto";
import { Column, Entity, ForeignKey, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderDetail } from "./orderdetail.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    userId: UUID;

    @Column()
    total: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetail[];
}