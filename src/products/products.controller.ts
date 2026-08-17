import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtPayloadType } from 'src/auth/types/auth-jwt.types';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

interface AuthenticatedRequest extends Request {
    user: JwtPayloadType;
} 

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}
    
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    // getProducts(@Req() request: Request): any{ --> this gives error Property 'user' does not exist on type 'Request'.
    // solution is : interface AuthenticatedRequest extends Request {user: JwtPayload}

    getProducts(@Req() request: AuthenticatedRequest): any{
        // get authUser payload from request
        console.log("### Request Object :", request.user)
        
        return this.productService.findAll()
    }
}
