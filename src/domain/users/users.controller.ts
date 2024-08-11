import { CurrentUser } from '@/domain/auth/decorators';
import { JwtAuthGuard } from '@/domain/auth/guards';
import { User } from '@/domain/users/schema';
import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@CurrentUser() user: User) {
    this.logger.verbose(`User ${user.email} is fetching users`);

    return this.userService.getUsers();
  }
}
