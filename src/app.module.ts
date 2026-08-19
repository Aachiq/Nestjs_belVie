import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/database/typeorm.config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // available everywhere
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),

    TypeOrmModule.forRoot(dbConfig),

    ProductsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // this object in cases rateLimiting to be applied on all routes // in case specific route so comment this
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware, LoggerMiddleware)
      .forRoutes('*');  // Applies to all routes

      // apply middleware on specific route with specific
      // .forRoutes({
      //   path: 'auth/signin',
      //   method: RequestMethod.POST,
      // });
  }
}
