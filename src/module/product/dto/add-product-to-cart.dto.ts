import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const AddProductToCartSchema = z.object({
    id: z.string().uuid({ message: "Invalid product ID" }),
    quantity: z
        .number()
        .min(1, { message: "Quantity must be at least 1" })
        .max(100, { message: "Quantity cannot exceed 100" }),
}).strict();

export class AddProductToCartDto extends createZodDto(AddProductToCartSchema) {
    @ApiProperty({
        description: "Product ID",
        example: "`${string}-${string}-${string}-${string}-${string}`",})
    id: string;
    @ApiProperty({
        description: "Quantity of the product to add to the cart",
        example: 1,
    })
    quantity: number;
}