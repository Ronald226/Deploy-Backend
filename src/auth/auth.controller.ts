import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guard/auth.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req) {
    const { email } = req.user;
    if (!email){
      throw new UnauthorizedException('Email is missing in user payload');
    }
    return this.authService.profile(email);
  }
}
