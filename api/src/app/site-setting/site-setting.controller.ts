import { Controller, Get } from '@nestjs/common';
import { SiteSettingService } from './site-setting.service';

@Controller('site-setting')
export class SiteSettingController {
  constructor(private readonly siteSettingService: SiteSettingService) {}
  @Get('referral_average_buy_amount')
  async getReferralAverageBuyAmount() {
    return await this.siteSettingService.getReferralAverageBuyAmount();
  }
}
