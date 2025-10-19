import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import {
  ReferralBuyBonusInsert,
  ReferralRewardsInsert,
} from 'src/app/referrals/referrals.interface';
import {
  InvestmentDb,
  NowPaymentsWebhook,
} from 'src/app/investment/investment.interface';
import { UserDb, UserReferralStatistic } from 'src/app/user/user.interface';

@Injectable()
export class DbHelpersService {
  private readonly logger = new Logger(DbHelpersService.name);
  private supabaseAdmin = this.supabaseService.getAdmin();

  constructor(private readonly supabaseService: SupabaseService) {}

  async createNewReferralReward(payload: ReferralRewardsInsert) {
    const { error } = await this.supabaseAdmin
      .from('referral_rewards')
      .insert(payload);

    if (error) {
      this.logger.error('Failed to create new referral reward', error);
      throw error;
    }

    this.logger.debug(
      `Referral reward created successfully for ${payload.referral_id}`,
    );
  }

  async createNewReferralBuyBonusIfNoExist(payload: ReferralBuyBonusInsert) {
    const { data, error: errorCheck } = await this.supabaseAdmin
      .from('referral_buy_bonus')
      .select('*')
      .eq('buyer_wallet', payload.buyer_wallet);

    if (errorCheck) {
      this.logger.error(
        'Error checking existing referral buy bonus',
        errorCheck,
      );
      throw errorCheck;
    }

    if (data.length > 0) {
      this.logger.verbose(
        `Referral buy bonus already exists for wallet: ${payload.buyer_wallet}`,
      );
      return;
    }

    const { error } = await this.supabaseAdmin
      .from('referral_buy_bonus')
      .insert(payload);

    if (error) {
      this.logger.error('Error inserting new referral buy bonus', error);
      throw error;
    }

    this.logger.debug(
      `Referral buy bonus inserted for wallet: ${payload.buyer_wallet}`,
    );
  }

  async mapToReferralRewards(
    nowpaymentsData: NowPaymentsWebhook,
  ): Promise<ReferralRewardsInsert | null> {
    try {
      const { payment_id } = nowpaymentsData;
      const {
        user_id: referral_id,
        wallet_address,
        invested_usd,
      } = await this.getInvestmentByOrderId(payment_id);

      const { referred_by: referrer_id } =
        await this.getUserByAddress(wallet_address);
      if (!referrer_id) {
        this.logger.warn(
          `No referrer found for wallet: ${wallet_address} — skipping reward.`,
        );
        return null;
      }

      const { commission_rate } =
        await this.getUserStatisticByUserId(referrer_id);

      return {
        investment_id: payment_id.toString(),
        claimed: false,
        referral_id,
        referrer_id,
        bonus_amount: invested_usd * commission_rate,
      };
    } catch (error) {
      this.logger.error('Error mapping referral reward payload', error);
      throw error;
    }
  }

  async mapToReferralBuyBonus(
    nowpaymentsData: NowPaymentsWebhook,
  ): Promise<ReferralBuyBonusInsert | null> {
    try {
      const { payment_id } = nowpaymentsData;
      const { crm_amount, wallet_address } =
        await this.getInvestmentByOrderId(payment_id);

      const { referred_by } = await this.getUserByAddress(wallet_address);
      if (!referred_by) {
        this.logger.verbose(
          `Wallet ${wallet_address} has no referrer — no buy bonus created.`,
        );
        return null;
      }

      const { referral_code } = await this.getUserById(referred_by);

      return {
        buyer_wallet: wallet_address.toLowerCase(),
        crm_bonus: crm_amount * 0.05,
        order_id: payment_id.toString(),
        referral_code,
      };
    } catch (error) {
      this.logger.error('Error mapping referral buy bonus payload', error);
      throw error;
    }
  }

  async getInvestmentByOrderId(order_id: number): Promise<InvestmentDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from('investments')
      .select('*')
      .eq('order_id', order_id)
      .maybeSingle();

    if (error) {
      this.logger.error(
        `Error fetching investment by order_id: ${order_id}`,
        error,
      );
      throw error;
    }

    return data;
  }

  async getUserById(user_id: string): Promise<UserDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user_id)
      .maybeSingle();

    if (error) {
      this.logger.error(`Error fetching user by id: ${user_id}`, error);
      throw error;
    }

    return data;
  }

  async getUserStatisticByUserId(
    user_id: string,
  ): Promise<UserReferralStatistic | null> {
    const { data, error } = await this.supabaseAdmin.rpc(
      'get_referral_statistics',
      { p_user_id: user_id },
    );

    if (error) {
      this.logger.error(
        `Error fetching referral statistics for user_id: ${user_id}`,
        error,
      );
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
      this.logger.error(
        `Error fetching user by wallet_address: ${wallet_address}`,
        error,
      );
      throw error;
    }

    return data;
  }
}
