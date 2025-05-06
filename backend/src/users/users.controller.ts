import { Controller, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('password')
  async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    await this.usersService.updatePassword(req.user.userId, updatePasswordDto);
    return { message: 'Password updated successfully' };
  }
}