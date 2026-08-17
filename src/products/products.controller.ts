import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get()
    getProducts(): any{
        return this.productService.findAll()
    }
}
