import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { InvestmentDb } from 'src/app/investment/investment.interface';
import { UserDb, UserReferralStatistic } from 'src/app/user/user.interface';

@Injectable()
export class DbHelpersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabaseAdmin = this.supabaseService.getAdmin();

  async getInvestmentByOrderId(order_id: number): Promise<InvestmentDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from('investments')
      .select('*')
      .eq('order_id', order_id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getReferrerByReferralId(referral_id: string): Promise<string | null> {
    const { data, error } = await this.supabaseAdmin
      .from('referrals')
      .select('referrer_id')
      .eq('wallet_address', referral_id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data.referrer_id;
  }

  async getUserStatisticByUserId(
    user_id: string,
  ): Promise<UserReferralStatistic | null> {
    const { data, error } = await this.supabaseAdmin.rpc(
      'get_referral_statistics',
      {
        p_user_id: user_id,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    return data[0];
  }

  async getUserByAddress(wallet_address: string): Promise<UserDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from('users')
      .select('*')
      .eq('wallet_address', wallet_address)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
