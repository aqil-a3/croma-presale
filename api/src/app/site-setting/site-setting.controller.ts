import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SiteSettingService } from './site-setting.service';
import { SettingAdminDbKey } from './site-setting.interface';

@Controller('site-setting')
export class SiteSettingController {
  constructor(private readonly siteSettingService: SiteSettingService) {}

  @Get()
  async getAllSiteSettings() {
    return await this.siteSettingService.getAllSiteSettings();
  }

  @Get('referral_average_buy_amount')
  async getReferralAverageBuyAmount() {
    return await this.siteSettingService.getReferralAverageBuyAmount();
  }

  @Put('edit/:key')
  async editSiteSetting(
    @Param('key') key: SettingAdminDbKey,
    @Body() value: any,
  ) {
    return await this.siteSettingService.editSiteSetting(key, value);
  }
}
