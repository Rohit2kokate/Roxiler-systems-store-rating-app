import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StoresService } from './stores.service';
import { SearchStoreDto } from './dto/search-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() searchDto: SearchStoreDto) {
    return this.storesService.findAll(searchDto);
  }
}