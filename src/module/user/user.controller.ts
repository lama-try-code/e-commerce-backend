import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../database/postgres/entities/user.entity";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { UserInformationDto } from "./dto/user-information.dto";
import { RolesGuard } from "../../common/guards/role.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/constants/role.enum";

@ApiTags('Users')
@Controller('users')

export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth('JWT')
    @Roles(Role.ADMIN)
    @Get()
    async getAllUser(): Promise<User[]> {
        return await this.userService.getAllUser();
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT')
    async getMe(@Request() req): Promise<UserInformationDto> {
        return req.user;
    }
}