import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import {
  InvestmentDb,
  NowPaymentsWebhook,
} from '../../app/investment/investment.interface';
import { UserDb, UserReferralStatistic } from '../../app/user/user.interface';
import {
  ReferralBuyBonusInsert,
  ReferralRewardsInsert,
} from '../../app/referrals/referrals.interface';

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

  async createNewReferralBuyBonusIfNoExist(payload: ReferralBuyBonusInsert) {
    const { data, error: errorCheck } = await this.supabaseAdmin
      .from('referral_buy_bonus')
      .select('*')
      .eq('buyer_wallet', payload.buyer_wallet);

    if (errorCheck) {
      console.error("Error when checking...")
      console.error(errorCheck);
      throw errorCheck;
    }
    
    if (data.length > 0) return;
    
    const { error } = await this.supabaseAdmin
    .from('referral_buy_bonus')
    .insert(payload);
    
    if (error) {
      console.error("Error when adding...")
      console.error(error);
      throw error;
    }
  }

  async mapToReferralRewards(
    nowpaymentsData: NowPaymentsWebhook,
  ): Promise<ReferralRewardsInsert | null> {
    const { payment_id } = nowpaymentsData;
    const {
      user_id: referral_id,
      wallet_address,
      invested_usd,
    } = await this.getInvestmentByOrderId(payment_id);

    const { referred_by: referrer_id } =
      await this.getUserByAddress(wallet_address);
    if (!referrer_id) return null;

    const { commission_rate } =
      await this.getUserStatisticByUserId(referrer_id);

    return {
      investment_id: payment_id.toString(),
      claimed: false,
      referral_id,
      referrer_id,
      bonus_amount: invested_usd * commission_rate,
    };
  }

  async mapToReferralBuyBonus(
    nowpaymentsData: NowPaymentsWebhook,
  ): Promise<ReferralBuyBonusInsert | null> {
    const { payment_id } = nowpaymentsData;
    const { crm_amount, wallet_address } =
      await this.getInvestmentByOrderId(payment_id);
    const { referred_by } = await this.getUserByAddress(wallet_address);
    if (!referred_by) return null;
    const { referral_code } = await this.getUserById(referred_by);

    return {
      buyer_wallet: wallet_address,
      crm_bonus: crm_amount * 0.05,
      order_id: payment_id.toString(),
      referral_code,
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

  async getUserById(user_id: string): Promise<UserDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from('referrals')
      .select('*')
      .eq('id', user_id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }
    return data;
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
