import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    saltOrRounds = 10;
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async signIn(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestException("Invalid credentials");
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    
    async signUp(CreateUserDto: CreateUserDto): Promise<{ access_token: string }> {
        const isExist = await this.userService.getUserByEmail(CreateUserDto.email);
        if(isExist) {
            throw new BadRequestException("User already exists");
        }
        const hashPassword = await bcrypt.hash(CreateUserDto.password, this.saltOrRounds);
        const user = await this.userService.createUser({
            ...CreateUserDto,
            password: hashPassword,
        });
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}