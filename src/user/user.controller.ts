import { UseGuards } from '@nestjs/common';
import { Get, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { User } from '@prisma/client';
import { Patch } from '@nestjs/common';
import { EditUserDto } from './edit-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
