import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import * as bcrypt from 'bcrypt';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { UsersService } from 'src/users/users.service';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';

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

    async login(loginDto: SignInRequestDto): Promise<SignInResponseDto>{
        const {email, password} = loginDto;

        const existingUser = await this.userService.findByEmail(email);
        if (!existingUser) {
            throw new ConflictException('User Email not Exist !');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser.password); 

        if (!isPasswordValid) {
            // here we could use built-in exception "throw new UnauthorizedException("Invalid credentials")"
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        
        // here we need do instanciation required. while in dto request even it has constructor we use it 
        // directly without using new SignInRequestDTO()
        return new SignInResponseDto(existingUser.id, existingUser.name, existingUser.email);
    }
}
