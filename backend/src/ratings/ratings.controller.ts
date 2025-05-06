import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RatingsService } from './ratings.service';
import { SubmitRatingDto } from './dto/submit-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async submitRating(@Request() req, @Body() submitRatingDto: SubmitRatingDto) {
    return this.ratingsService.submitRating(req.user.userId, submitRatingDto);
  }
}