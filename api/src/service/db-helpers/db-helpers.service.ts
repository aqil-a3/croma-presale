import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import {
  InvestmentDb,
  NowPaymentsWebhook,
} from '../../app/investment/investment.interface';
import { UserDb, UserReferralStatistic } from '../../app/user/user.interface';
import { ReferralRewardsInsert } from '../../app/referrals/referrals.interface';

@Injectable()
export class DbHelpersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabaseAdmin = this.supabaseService.getAdmin();

  async createNewReferralReward(payload: ReferralRewardsInsert) {
    const { error } = await this.supabaseAdmin
      .from('referral_rewards')
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async mapToReferralRewards(
    nowpaymentsData: NowPaymentsWebhook,
  ): Promise<ReferralRewardsInsert> {
    const { payment_id } = nowpaymentsData;
    const { user_id: referral_id, crm_amount } =
      await this.getInvestmentByOrderId(payment_id);

    const referrer_id = await this.getReferrerByReferralId(referral_id);

    const { commission_rate } =
      await this.getUserStatisticByUserId(referral_id);

    return {
      investment_id: payment_id.toString(),
      claimed: false,
      referral_id,
      referrer_id,
      bonus_amount: crm_amount * commission_rate,
    };
  }

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
