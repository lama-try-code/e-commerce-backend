import { Connection } from "mongoose";
import { CartSchema } from "../database/mongo/schema/cart.schema";

export const CartProviders = [
  {
    provide: 'CART_MODEL',
    //must: use the schema has declare in the schema/cart.schema.ts
    useFactory: (connection: Connection) => connection.model('Cart', CartSchema),
    inject: ['MONGO_DATA_SOURCE'],
  },
]