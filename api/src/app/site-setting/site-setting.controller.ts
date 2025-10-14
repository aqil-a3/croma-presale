import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SiteSettingService } from './site-setting.service';
import { SettingAdminDbKey } from './site-setting.interface';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';

@Controller('site-setting')
export class SiteSettingController {
  constructor(private readonly siteSettingService: SiteSettingService) {}

  @UseGuards(SharedSecretGuard)
  @Get()
  async getAllSiteSettings() {
    return await this.siteSettingService.getAllSiteSettings();
  }

  @UseGuards(SharedSecretGuard)
  @Get('/available-currencies')
  async getAvailableCurrencies() {
    return await this.siteSettingService.getAvailableCurrencies();
  }

  @UseGuards(SharedSecretGuard)
  @Get('referral_average_buy_amount')
  async getReferralAverageBuyAmount() {
    return await this.siteSettingService.getReferralAverageBuyAmount();
  }

  @UseGuards(SharedSecretGuard)
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
