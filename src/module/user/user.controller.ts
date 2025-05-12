import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../database/postgres/entities/user.entity";
import { UUID } from "crypto";

@ApiTags('Users')
@Controller('users')

export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUser(): Promise<User[]> {
        return this.userService.getAllUser();
    }

    @Get(':id')
    async getUserById(@Param('id') id: UUID): Promise<User | null> {
        return this.userService.getUserById(id);
    }
}