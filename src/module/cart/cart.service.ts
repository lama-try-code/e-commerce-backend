import { Inject, Injectable } from "@nestjs/common";
import { CartDocument } from "../database/mongo/schema/cart.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class CartService {
    constructor(
        @Inject('CART_MODEL')
        private cartModel: Model<CartDocument>,
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

    private uuidToObjectId(uuid: string): Types.ObjectId {
        const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
        return new Types.ObjectId(buffer);
    }
}