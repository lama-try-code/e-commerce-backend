import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    @ApiBody({ type: CreateUserDto })
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.authService.signUp(createUserDto);
    }

    @Post('signin')
    @ApiBody({ type: SignInUserDto })
    async signIn(@Body() signInUserDto: SignInUserDto) {
        return await this.authService.signIn(signInUserDto.email, signInUserDto.password);
    }
}