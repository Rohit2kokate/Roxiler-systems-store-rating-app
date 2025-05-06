import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { RatingsModule } from './ratings/ratings.module';
import { AdminModule } from './admin/admin.module';
import { User } from './users/entities/user.entity';
import { Store } from './stores/entities/store.entity';
import { Rating } from './ratings/entities/rating.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Store, Rating],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    StoresModule,
    RatingsModule,
    AdminModule,
  ],
})
export class AppModule {}