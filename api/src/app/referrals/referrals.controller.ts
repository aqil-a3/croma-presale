import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @UseGuards(SharedSecretGuard)
  @Get('newest')
  async getNewestReferrals() {
    return await this.referralsService.getNewestReferrals();
  }

  @UseGuards(SharedSecretGuard)
  @Get(':wallet_address/rewards')
  async getReferralRewardByAddress(@Param('wallet_address') wallet_address: string) {
    return await this.referralsService.getReferralRewardByAddress(wallet_address);
  }
}
