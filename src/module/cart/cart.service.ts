import { Inject, Injectable } from "@nestjs/common";
import { Cart } from "../database/mongo/schema/cart.schema";
import { Model, Types } from "mongoose";
import { UUID } from "crypto";

@Injectable()
export class CartService {
    constructor(
        @Inject('CART_MODEL')
        private cartModel: Model<Cart>,
    ) {}

    getAllCart() {
        return this.cartModel.find().exec();
    }

    getCartByUserId(userId: string) {
        return this.cartModel.findById(userId).exec();
    }

    createCart(userId: string) {
        const newCart = new this.cartModel();
        newCart.userId = this.uuidToObjectId(userId);
        return newCart.save();
    }

    uuidToObjectId(uuid: string): Types.ObjectId {
        const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
        return new Types.ObjectId(buffer);
    }
}