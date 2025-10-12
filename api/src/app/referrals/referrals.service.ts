import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { ReferralInsert } from './referrals.interface';

@Injectable()
export class ReferralsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabaseAdmin = this.supabaseService.getAdmin();
  private tableName = 'referrals';

  async getNewestReferrals() {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async createNewReferral(payload: ReferralInsert) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
  