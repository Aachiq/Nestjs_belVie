import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpResponseDto } from './dto/signup-response.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async register(userDto: SignUpRequestDto): Promise<SignUpResponseDto> {
        const { name, email, password } = userDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // return the DTO structure since save() return User entity
        
        // return this.usersRepository.save(createdUser);

        const user = await this.usersRepository.save(createdUser);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    }
}
