import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../database/postgres/entities/user.entity";
import { UUID } from "crypto";
import { CreateUserDto } from "./dto/create-user.dto";
import { CartService } from "../cart/cart.service";

@Injectable() 
export class UserService {
    constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private cartService: CartService,
  ) {}

    getAllUser() {
        return this.userRepository.find();
    }

    getUserById(id: UUID) {
        return this.userRepository.findOne({ where: { id } });
    }

    getUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async createUser(user: CreateUserDto) {
        var newUser = await this.userRepository.save(user);
        this.cartService.createCart(newUser.id);
        if(!newUser) {
            throw new BadRequestException('Create user failed');
        }
        return newUser;
    }
}