import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import * as bcrypt from 'bcrypt';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) { }

    async register(userDto: SignUpRequestDto): Promise<SignUpResponseDto> {
        const { name, email, password } = userDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const isAlreadyExist =  await this.userService.findByEmail(email);
        if(isAlreadyExist){
            // Throw exception (basic exception # Nestjs Exceptions)
            // throw new Error("User Email already exist !")
            throw new ConflictException("User Email already exist !")
        }

        const createdUser = await this.userService.createUser(name, email, hashedPassword);

        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role
        };
    }
}
