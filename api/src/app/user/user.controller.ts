import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SharedSecretGuard } from 'src/guards/shared-secret.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(SharedSecretGuard)
  @Get('address/:address')
  async getUserByAddress(@Param('address') address: string) {
    return this.userService.getUserByAddress(address);
  }

  @UseGuards(SharedSecretGuard)
  @Get('address/:address/statistic')
  async getUserStatisticByAddress(@Param('address') address: string) {
    return this.userService.getUserStatisticByAddress(address);
  }

  @UseGuards(SharedSecretGuard)
  @Get('ref-code/:code')
  async getUserByReferralCode(@Param('code') code: string) {
    return await this.userService.getUserByRefCode(code);
  }

  @UseGuards(SharedSecretGuard)
  @Post('create')
  async createUserIfNoExist(@Body() data: { wallet_address: string }) {
    const { wallet_address } = data;
    return this.userService.createUserIfNoExist(wallet_address.toLowerCase());
  }
  
  @UseGuards(SharedSecretGuard)
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
