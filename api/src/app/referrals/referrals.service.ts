import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import {
  ReferralInsert,
  ReferralRewardsDB,
  ReferralRewardsInsert,
} from './referrals.interface';
import {
  InvestmentDb,
  NowPaymentsWebhook,
} from '../investment/investment.interface';
import { UserDb, UserReferralStatistic } from '../user/user.interface';

@Injectable()
export class ReferralsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private supabaseAdmin = this.supabaseService.getAdmin();
  private tableName = 'referrals';

  // HELPERS
  private async getInvestmentByOrderId(
    order_id: number,
  ): Promise<InvestmentDb | null> {
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

  private async getReferrerByReferralId(
    referral_id: string,
  ): Promise<string | null> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('referrer_id')
      .eq('wallet_address', referral_id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data.referrer_id;
  }

  private async getUserStatisticByUserId(
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

  private async getUserByAddress(
    wallet_address: string,
  ): Promise<UserDb | null> {
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
  // HELPERS END

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

  async getReferralRewardByAddress(
    wallet_address: string,
  ): Promise<ReferralRewardsDB[]> {
    const { id } = await this.getUserByAddress(wallet_address);
    const { data, error } = await this.supabaseAdmin
      .from('referral_rewards')
      .select('*')
      .eq('referrer_id', id);

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
}
