import { Controller, Get } from '@nestjs/common';
import { ReferralsService } from './referrals.service';

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get('newest')
  async getNewestReferrals() {
    return await this.referralsService.getNewestReferrals();
  }
}
