import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException('Invalid old password');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.save(user);
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}