import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { AuthService } from './auth.service';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
        // but here logs needs to know if "user signedUp or not" not just message
        // to do that we add logs inside service without IdRequest and if we need request ID
        // either Context that use asyncLocalStorage or library "pino | winstom" that uses internally this.
        return this.authService.register(dto);
    }

    @Post('signin')
    // uncomment this 2 lines in case we wanna apply just on this specific route
    // @UseGuards(ThrottlerGuard)
    // @Throttle({ default: { limit: 5, ttl: 60000 } })
    async signin(@Body() loginDto: SignInRequestDto): Promise<SignInResponseDto>{
        return this.authService.login(loginDto)
    }
}
