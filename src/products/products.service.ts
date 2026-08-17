import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly usersRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[] | null> {
        return this.usersRepository.find();
    }
}
