import { registerEnumType } from "@nestjs/graphql";

export enum ProductStatus {
    OUT_OF_STOCK = 'OUT_OF_STOCK',
    IN_STOCK = 'IN_STOCK',
}

registerEnumType(ProductStatus, {
    name: 'ProductStatus',
    description: 'The status of the product',
    valuesMap: {
        OUT_OF_STOCK: {
            description: 'The product is out of stock',
        },
        IN_STOCK: {
            description: 'The product is in stock',
        },
    },
})