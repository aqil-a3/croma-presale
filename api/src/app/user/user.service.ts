import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { UserDb } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'users';

  private generateReferralCode(length = 8): string {
    const random = Math.random()
      .toString(36)
      .substring(2, 2 + length);
    return `CROMA-${random.toUpperCase()}`;
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

  async getUserStatisticByAddress(
    wallet_address: string,
  ): Promise<UserDb | null> {

    const {id} = await this.getUserByAddress(wallet_address);

    const { data, error } = await this.supabaseAdmin.rpc(
      'get_referral_statistics',
      {
        p_user_id: id,
      },
    );

    if (error) {
      console.error(error);
      throw error;
    }

    return data[0];
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

  async createUserIfNoExist(wallet_address: string) {
    const data = await this.getUserByAddress(wallet_address);

    if (data) return;

    await this.createNewUser(wallet_address);
  }
}
