import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, required: true }) // ref userId (Postgres)
  userId: Types.ObjectId;

  @Prop([
    {
      productId: Types.ObjectId, // ref đến product
      quantity: Number,
    },
  ])
  items: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
export type CartDocument = HydratedDocument<Cart>;