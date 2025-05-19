import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './module/database/database.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { CartModule } from './module/cart/cart.module';
import { GraphqlModule } from './module/graphql/graphql.module';
import { ProductModule } from './module/product/product.module';
import { GoogleModule } from './module/social-auth/google/google.module';
import { CronModule } from './module/cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, 
    }),
    DatabaseModule,
    AuthModule,
    GoogleModule,
    UserModule,
    CartModule,
    GraphqlModule,
    ProductModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
