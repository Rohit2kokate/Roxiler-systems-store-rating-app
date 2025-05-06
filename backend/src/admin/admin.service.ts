import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Store } from '../stores/entities/store.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { FilterDto } from './dto/filter.dto';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    private usersService: UsersService,
    private storesService: StoresService,
  ) {}

  async getStats(): Promise<{ users: number; stores: number; ratings: number }> {
    const [users, stores, ratings] = await Promise.all([
      this.usersRepository.count(),
      this.storesRepository.count(),
      this.ratingsRepository.count(),
    ]);
    return { users, stores, ratings };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, address, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, email, password: hashedPassword, address, role });
    return this.usersRepository.save(user);
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.create(createStoreDto);
  }

  async findUsers(filterDto: FilterDto): Promise<User[]> {
    const { name, email, address, role, sortBy = 'name', order = 'ASC' } = filterDto;
    const query = this.usersRepository.createQueryBuilder('user');
    if (name) query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    if (email) query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    if (address) query.andWhere('user.address ILIKE :address', { address: `%${address}%` });
    if (role) query.andWhere('user.role = :role', { role });
    query.orderBy(`user.${sortBy}`, order);
    return query.getMany();
  }

  async findStores(filterDto: FilterDto): Promise<Store[]> {
    const { name, email, address, sortBy = 'name', order = 'ASC' } = filterDto;
    const query = this.storesRepository.createQueryBuilder('store')
      .leftJoinAndSelect('store.owner', 'owner')
      .leftJoinAndSelect('store.ratings', 'ratings');
    if (name) query.andWhere('store.name ILIKE :name', { name: `%${name}%` });
    if (email) query.andWhere('store.email ILIKE :email', { email: `%${email}%` });
    if (address) query.andWhere('store.address ILIKE :address', { address: `%${address}%` });
    query.orderBy(`store.${sortBy}`, order);
    return query.getMany();
  }
}