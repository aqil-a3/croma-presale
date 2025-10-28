import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import {
  ReferralInsert,
  ReferralQueryParams,
  ReferralRewardsDB,
  ReferralRewardsInsert,
  ReferralWithdrawRequestInsert,
} from './referrals.interface';
import { DbHelpersService } from '../../service/db-helpers/db-helpers.service';
import { DatabaseTable } from '../../common/constants/database-tables.enum';

@Injectable()
export class ReferralsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly dbHelperService: DbHelpersService,
  ) {}

  private logger = new Logger(ReferralsService.name);
  private supabaseAdmin = this.supabaseService.getAdmin();
  private tableName = 'referrals';

  async getAdminReferralWDRequest({ from, to }: ReferralQueryParams) {
    const { data, error } = await this.supabaseAdmin
      .from('referral_withdraw_requests')
      .select('*')
      .range(from, to);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

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
    if (!id) return null;
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
      .from(DatabaseTable.REFERRAL_REWARDS)
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewWithdrawRequest(payload: ReferralWithdrawRequestInsert) {
    const { error } = await this.supabaseAdmin
      .from(DatabaseTable.REFERRAL_WITHDRAW_REQUESTS)
      .insert(payload);
    if (error) {
      this.logger.error('Error createNewWithdrawRequest', error.stack);
      throw error;
    }
  }
}
