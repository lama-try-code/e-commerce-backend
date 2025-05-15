import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    quantity: z.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
}).strict();

export class CreateProductDto extends createZodDto(CreateProductSchema) {
    name: string;
    description: string;
    price: number;
    quantity: number;
}