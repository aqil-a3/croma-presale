import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { SharedSecretGuard } from 'src/guards/shared-secret.guard';

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @UseGuards(SharedSecretGuard)
  @Get('newest')
  async getNewestReferrals() {
    return await this.referralsService.getNewestReferrals();
  }
}
