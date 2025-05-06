import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from '../admin/dto/create-store.dto';
import { SearchStoreDto } from './dto/search-store.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    private usersService: UsersService,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const { ownerId, ...storeData } = createStoreDto;
    const owner = await this.usersService.findOne(ownerId);
    if (!owner) {
        throw new Error('Owner not found');
      }
    const store = this.storesRepository.create({ ...storeData, owner });
    return this.storesRepository.save(store);
  }

  async findAll(searchDto: SearchStoreDto): Promise<Store[]> {
    const { name, address, sortBy = 'name', order = 'ASC' } = searchDto;
    const query = this.storesRepository.createQueryBuilder('store')
      .leftJoinAndSelect('store.owner', 'owner')
      .leftJoinAndSelect('store.ratings', 'ratings');

    if (name) query.andWhere('store.name ILIKE :name', { name: `%${name}%` });
    if (address) query.andWhere('store.address ILIKE :address', { address: `%${address}%` });
    query.orderBy(`store.${sortBy}`, order);

    return query.getMany();
  }
}