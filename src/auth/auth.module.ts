import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  // keep this module need access to needed Entity in Service
  imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}
