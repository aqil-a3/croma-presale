import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';

@Injectable()
export class SiteSettingService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'site_settings';

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
}
