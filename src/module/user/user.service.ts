import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../database/postgres/entities/user.entity";
import { UUID } from "crypto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable() 
export class UserService {
    constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

    getAllUser() {
        return this.userRepository.find();
    }

    getUserById(id: UUID) {
        return this.userRepository.findOne({ where: { id } });
    }

    createUser(user: CreateUserDto) {
        return this.userRepository.save(user);
    }
}