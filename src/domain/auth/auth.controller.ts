import { AuthService } from '@/domain/auth/auth.service';
import { CurrentUser } from '@/domain/auth/decorators';
import {
  GoogleAuthGuard,
  JwtRefreshAuthGuard,
  LocalAuthGuard,
} from '@/domain/auth/guards';
import { User } from '@/domain/users/schema/user-schema';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
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

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async loginGoogle() {
    // Guard will handle the redirect
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }
}
