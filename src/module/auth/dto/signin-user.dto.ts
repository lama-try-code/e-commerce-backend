import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SignInUserSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
}).strict();

export class SignInUserDto extends createZodDto(SignInUserSchema) {
    @ApiProperty({
        description: "User email",
        example: "example@email.com",
        minLength: 1,
    })
    email: string;
    @ApiProperty({
        description: "User password",
        example: "SecurePass123!",
        minLength: 1,
    })
    password: string;
}