import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    @ApiBody({ type: CreateUserDto })
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }
}