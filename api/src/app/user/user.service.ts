import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { UserDb, UserReferralStatistic } from './user.interface';
import { ReferralsService } from '../referrals/referrals.service';

@Injectable()
export class UserService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly referralService: ReferralsService,
  ) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'users';

  private generateReferralCode(length = 8): string {
    const random = Math.random()
      .toString(36)
      .substring(2, 2 + length);
    return `CROMA-${random.toUpperCase()}`;
  }

  async createNewUser(wallet_address: string) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert({ wallet_address, referral_code: this.generateReferralCode() });

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewUserWithReferral(
    wallet_address: string,
    referral_code: string,
  ) {
    const referrer = await this.getUserByRefCode(referral_code);
    const { error } = await this.supabaseAdmin.from(this.tableName).insert({
      wallet_address,
      referral_code: this.generateReferralCode(),
      referred_by: referrer.id,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    await this.referralService.createNewReferral({
      referred_by: referrer.id,
      status: 'pending',
      wallet_address,
    });
  }

  async createUserIfNoExist(wallet_address: string, referral_code?: string) {
    const data = await this.getUserByAddress(wallet_address);

    if (data) return;

    if (referral_code) {
      await this.createNewUserWithReferral(wallet_address, referral_code);
      return;
    }
    await this.createNewUser(wallet_address);
  }

  async getUserByAddress(wallet_address: string): Promise<UserDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('wallet_address', wallet_address)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getReferrerByReferralId(referral_id: string): Promise<string | null> {
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

  async getUserByRefCode(referral_code: string): Promise<UserDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('referral_code', referral_code)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getUserStatisticByAddress(
    wallet_address: string,
  ): Promise<UserReferralStatistic | null> {

    const { data, error } = await this.supabaseAdmin.rpc(
      'get_referral_statistics',
      {
        p_wallet_address : wallet_address,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    return data[0];
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
}
