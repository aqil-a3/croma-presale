import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import {
  NowPaymentsFullCurrency,
  PaymentSettingValue,
  SettingAdminDbKey,
} from './site-setting.interface';
import axios from 'axios';

@Injectable()
export class SiteSettingService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'site_settings';
  private readonly nowPaymentApiKey = process.env.NOWPAYMENTS_API_KEY;
  private readonly nowPaymentBaseUrl = 'https://api.nowpayments.io';

  async editSiteSetting(key: SettingAdminDbKey, value: any) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .update({ value })
      .eq('key', key);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllSiteSettings() {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getAvailableCurrencies() {
    try {
      const { data } = await axios.get(
        `${this.nowPaymentBaseUrl}/v1/currencies`,
        {
          headers: {
            'x-api-key': this.nowPaymentApiKey,
          },
        },
      );

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getReferralAverageBuyAmount() {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('key', 'referral_average_buy_amount')
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data.value;
  }

  async mapToPaymentSettingValue(raw: string[]): Promise<PaymentSettingValue> {
    try {
      const { data } = await axios.get(
        `${this.nowPaymentBaseUrl}/v1/full-currencies`,
        {
          headers: {
            'x-api-key': this.nowPaymentApiKey,
          },
        },
      );

      const currencies = data.currencies as NowPaymentsFullCurrency[];

      const result: PaymentSettingValue['value'] = raw.map((r) => {
        const selectedCurrencies = currencies.find(
          (curr) => curr.code.toLowerCase() === r.toLowerCase(),
        );

        return {
          icon: selectedCurrencies.logo_url,
          currency: r,
          name: selectedCurrencies.name,
        };
      });

      return { value: result };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
