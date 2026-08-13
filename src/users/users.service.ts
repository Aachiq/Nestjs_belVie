import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findUserByEmail(email);
    }

    async createUser(name: string,email: string,password: string): Promise<User> {
        return this.userRepository.registerUser(
            name,
            email,
            password,
        );
    }
}