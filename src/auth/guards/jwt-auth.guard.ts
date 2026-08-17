import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    
    // this is array destructuring instead of doing
    // const parts = authHeader.split(' ');
    // const type = parts[0];
    // const token = parts[1];
    // we need type as well to check if "Bearer" or other type.so not just "Token"
    // const extractedToken = authHeader.split(' ')[1];


    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}