import { z } from "zod";
import { createZodDto } from 'nestjs-zod/dto';
import { ApiProperty } from "@nestjs/swagger";

export const CreateUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
}).strict();

// DTO that works with NestJS, Swagger, and provides type safety
export class CreateUserDto extends createZodDto(CreateUserSchema) {
  @ApiProperty({ 
    description: 'User frist name', 
    example: 'john',
    minLength: 1,
    maxLength: 20
  })
  firstName: string;

  @ApiProperty({ 
    description: 'User last name', 
    example: 'doe',
    minLength: 1,
    maxLength: 20
  })
  lastName: string;


  @ApiProperty({ 
    description: 'User email', 
    example: 'john@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({ 
    description: 'User password', 
    example: 'SecurePass123!',
    minLength: 6
  })
  password: string;
}