import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';
import { ReferralWithdrawRequestUser } from './referrals.interface';
import { DbHelpersService } from '../../service/db-helpers/db-helpers.service';

@Controller('referrals')
export class ReferralsController {
  constructor(
    private readonly referralsService: ReferralsService,
    private readonly dbHelperService: DbHelpersService,
  ) {}

  @UseGuards(SharedSecretGuard)
  @Get('newest')
  async getNewestReferrals() {
    return await this.referralsService.getNewestReferrals();
  }

  @UseGuards(SharedSecretGuard)
  @Get(':wallet_address/rewards')
  async getReferralRewardByAddress(
    @Param('wallet_address') wallet_address: string,
  ) {
    return await this.referralsService.getReferralRewardByAddress(
      wallet_address,
    );
  }

  @UseGuards(SharedSecretGuard)
  @Post('withdraw')
  async createNewWithdrawRequest(@Body() body: ReferralWithdrawRequestUser) {
    const payload =
      await this.dbHelperService.mapToReferralWithdrawRequestInsert(body);
    return await this.referralsService.createNewWithdrawRequest(payload);
  }
}
