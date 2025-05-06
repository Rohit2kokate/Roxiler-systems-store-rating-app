import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { SubmitRatingDto } from './dto/submit-rating.dto';
import { StoresService } from '../stores/stores.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    private storesService: StoresService,
    private usersService: UsersService,
  ) {}

  async submitRating(userId: string, submitRatingDto: SubmitRatingDto): Promise<Rating> {
    const { storeId, rating } = submitRatingDto;
    const user = await this.usersService.findOne(userId);
    if (!user) {
        throw new Error('Owner not found');
      }
    const store = await this.storesService.findAll({}).then(stores => stores.find(s => s.id === storeId));
    if (!store) throw new BadRequestException('Store not found');

    const existingRating = await this.ratingsRepository.findOne({ where: { user: { id: userId }, store: { id: storeId } } });
    if (existingRating) {
      existingRating.rating = rating;
      return this.ratingsRepository.save(existingRating);
    }

    const newRating = this.ratingsRepository.create({ user, store, rating });
    return this.ratingsRepository.save(newRating);
  }
}