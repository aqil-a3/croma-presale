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
import { DbHelpersService } from '../../service/db-helpers/db-helpers.service';

@Injectable()
export class ReferralsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly dbHelperService: DbHelpersService,
  ) {}

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

  async getReferralRewardByAddress(
    wallet_address: string,
  ): Promise<ReferralRewardsDB[]> {
    const { id } = await this.dbHelperService.getUserByAddress(wallet_address);
    const { data, error } = await this.supabaseAdmin
      .from('referral_rewards')
      .select('*')
      .eq('referrer_id', id)
      .eq('claimed', false);

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
}
