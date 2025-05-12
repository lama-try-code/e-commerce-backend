import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../database/postgres/entities/user.entity";
import { UUID } from "crypto";
import { JwtAuthGuard } from "../auth/jwt.guard";

@ApiTags('Users')
@Controller('users')

export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUser(): Promise<User[]> {
        return this.userService.getAllUser();
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT') 
    getMe(@Request() req) {
        console.log('User in request:', req.user); 
        return req.user;
    }
}