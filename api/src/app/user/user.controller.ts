import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUserIfNoExist(@Body() data: { wallet_address: string }) {
    const { wallet_address } = data;
    return this.userService.createUserIfNoExist(wallet_address.toLowerCase());
  }
}
