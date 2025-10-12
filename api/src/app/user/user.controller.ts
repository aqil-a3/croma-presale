import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('address/:address')
  async getUserByAddress(@Param('address') address: string) {
    return this.userService.getUserByAddress(address);
  }

  @Get('address/:address/statistic')
  async getUserStatisticByAddress(@Param('address') address: string) {
    return this.userService.getUserStatisticByAddress(address);
  }

  @Get('ref-code/:code')
  async getUserByReferralCode(@Param('code') code: string) {
    return await this.userService.getUserByRefCode(code);
  }

  @Post('create')
  async createUserIfNoExist(@Body() data: { wallet_address: string }) {
    const { wallet_address } = data;
    return this.userService.createUserIfNoExist(wallet_address.toLowerCase());
  }
  @Post('create/with-referral')
  async createUserWithReferral(
    @Body() data: { wallet_address: string; referral_code: string },
  ) {
    const { wallet_address, referral_code } = data;
    return this.userService.createUserIfNoExist(
      wallet_address.toLowerCase(),
      referral_code,  
    );
  }
}
