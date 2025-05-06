import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { FilterDto } from './dto/filter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('stats')
  async getStats() {
    return this.adminService.getStats();
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  @Post('stores')
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.adminService.createStore(createStoreDto);
  }

  @Get('users')
  async findUsers(@Query() filterDto: FilterDto) {
    return this.adminService.findUsers(filterDto);
  }

  @Get('stores')
  async findStores(@Query() filterDto: FilterDto) {
    return this.adminService.findStores(filterDto);
  }
}