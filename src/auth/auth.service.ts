import { ConflictException, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import * as bcrypt from 'bcrypt';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { UsersService } from 'src/users/users.service';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {

    // instance LOagger object
    private readonly logger = new Logger();

    constructor(private readonly userService: UsersService) { }

    async register(userDto: SignUpRequestDto): Promise<SignUpResponseDto> {
        const { name, email, password } = userDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const isAlreadyExist =  await this.userService.findByEmail(email);
        if(isAlreadyExist){
            // Throw exception (basic exception # Nestjs Exceptions)
            // throw new Error("User Email already exist !")
            
            // this bellow Logger works fine but we should instance one object above and call it wherever
            // Logger.warn('User Email Already Exist !');

            this.logger.warn(`User Email Already Exist ${email} !`);

            throw new ConflictException("User Email already exist !")
        }

        const createdUser = await this.userService.createUser(name, email, hashedPassword);

        // here log directly with ry catch becasue "this.userService.createUser()" throw errro and stop when it fails
        this.logger.log(`User signed up successfully userId=${createdUser.id}`,);

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
        
        console.log('process.env.JWT_SECRET :', process.env.JWT_SECRET)
        // Generate JWT
        const token = jwt.sign(
            { sub: existingUser.id, email: email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }, // or any expiration
        );

        // here we need do instanciation required. while in dto request even it has constructor we use it 
        // directly without using new SignInRequestDTO()
        return new SignInResponseDto(existingUser.id, existingUser.name, existingUser.email, token);
    }
}
