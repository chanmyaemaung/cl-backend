import { AuthService } from '@/domain/auth/auth.service';
import { CurrentUser } from '@/domain/auth/decorators';
import { LocalAuthGuard } from '@/domain/auth/guards';
import { User } from '@/domain/users/schema/user-schema';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }
}
