import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    saltOrRounds = 10;

    constructor(private userService: UserService, private jwtService: JwtService) {}
    signIn() {

    }
    async signUp(CreateUserDto: CreateUserDto) {
        const hashPassword = await bcrypt.hash(CreateUserDto.password, 10);
        const user = await this.userService.createUser({
            ...CreateUserDto,
            password: hashPassword,
        });
    }
}