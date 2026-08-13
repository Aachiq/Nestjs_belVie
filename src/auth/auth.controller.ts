import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { AuthService } from './auth.service';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
        return this.authService.register(dto);
    }

    @Post('signin')
    async signin(@Body() loginDto: SignInRequestDto): Promise<SignInResponseDto>{
        return this.authService.login(loginDto)
    }
}
