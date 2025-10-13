import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { SettingAdminDbKey } from './site-setting.interface';

@Injectable()
export class SiteSettingService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'site_settings';

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
}
