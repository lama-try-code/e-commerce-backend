import { IsEmail, IsString } from "class-validator";
import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('users') 
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @IsString()
    @Column()
    firstName: string;

    @IsString()
    @Column() 
    lastName: string;

    @IsEmail()
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: 'customer'})
    role:string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}