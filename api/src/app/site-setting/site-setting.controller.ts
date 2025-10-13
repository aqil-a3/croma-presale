import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { SiteSettingService } from './site-setting.service';
import { SettingAdminDbKey } from './site-setting.interface';

@Controller('site-setting')
export class SiteSettingController {
  constructor(private readonly siteSettingService: SiteSettingService) {}

  @Get()
  async getAllSiteSettings() {
    return await this.siteSettingService.getAllSiteSettings();
  }

  @Get('/available-currencies')
  async getAvailableCurrencies() {
    return await this.siteSettingService.getAvailableCurrencies();
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
    const allowedKey: SettingAdminDbKey[] = [
      'referral_average_buy_amount',
      'payment_methods',
    ];

    if (key === 'payment_methods') {
      const paymentValues =
        await this.siteSettingService.mapToPaymentSettingValue(value);

        value = paymentValues;
    }

    if (!allowedKey.includes(key))
      throw new BadRequestException(`${key} is can't be edited`);
    return await this.siteSettingService.editSiteSetting(key, value);
  }
}
