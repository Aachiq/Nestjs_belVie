import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

interface IUserRepository {
    findUserByEmail(email: string): Promise<User | null>;
    registerUser(name: string, email: string, password: string): Promise<User>;
    optionalMethod?(): void;
}

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async findUserByEmail(email: string) {
        return this.usersRepository.findOne({
            where: { email },
        });
    }

    async registerUser(name: string, email: string, password: string): Promise<User> {
        const user = this.usersRepository.create({
            name,
            email,
            password,
        });

        return this.usersRepository.save(user);
    }

}