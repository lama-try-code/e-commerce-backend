import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../database/postgres/entities/user.entity";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { UserInformationDto } from "./dto/user-information.dto";

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
    async getMe(@Request() req): Promise<UserInformationDto> {
        return req.user;
    }
}