import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    quantity: z.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
}).strict();

@InputType()
export class CreateProductDto extends createZodDto(CreateProductSchema) {
    @Field(() => String)
    name: string;
    @Field(() => String)
    description: string;
    @Field(() => Float)
    price: number;
    @Field(() => Int)
    quantity: number;
}