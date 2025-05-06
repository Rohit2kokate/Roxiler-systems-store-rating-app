import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../users/entities/user.entity';
import { Store } from '../stores/entities/store.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { UsersModule } from '../users/users.module';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Store, Rating]), UsersModule, StoresModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}