import { Inject, Injectable } from "@nestjs/common";
import { CartDocument } from "../database/mongo/schema/cart.schema";
import { Model, Types } from "mongoose";
import { AddProductToCartDto } from "../product/dto/add-product-to-cart.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CartService {
    constructor(
        @Inject('CART_MODEL')
        private cartModel: Model<CartDocument>,
    ) { }

    getAllCart() {
        return this.cartModel.find().exec();
    }

    async getCartByUserId(userId: string) {
        var idTransfer = this.uuidToObjectId(userId);
        const cart = await this.cartModel.findOne({userId: idTransfer}).exec();
        return cart?.toObject();
    }

    createCart(userId: string) {
        const newCart = new this.cartModel();
        newCart.userId = this.uuidToObjectId(userId);
        return newCart.save();
    }

    async addProductToCart(userId: string, addProductToCartDto: AddProductToCartDto) {
        let cart = await this.cartModel.findById(userId).exec();

        if (!cart) {
            cart = await this.createCart(userId);
        }

        //check product is exist in cart or not
        const existingProductIndex = cart.items.findIndex(item =>
            item.productId.toString() === addProductToCartDto.id
        );

        if (existingProductIndex !== -1) {
            const existingItem = cart.items[existingProductIndex];
            const newQuantity = existingItem.quantity + addProductToCartDto.quantity;

            cart.items[existingProductIndex].quantity = newQuantity;

            //update quantity of the product in cart
            //mongodb update prop almost like set(key, value)
            return this.cartModel.findByIdAndUpdate(
                userId,
                { $set: { [`items.${existingProductIndex}.quantity`]: newQuantity } },
                { new: true }
            ).exec();
        } else {
            return this.cartModel.findByIdAndUpdate(
                userId,
                { $push: { items: addProductToCartDto } },
                { new: true }
            ).exec();
        }
    }

    private uuidToObjectId(uuid: string): Types.ObjectId {
        const hexString = uuid.replace(/-/g, '');
        const objectIdHex = hexString.substring(0, 24);
        return new Types.ObjectId(objectIdHex);
    }
}