import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { UserDb } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'users';

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

  async createNewUser(wallet_address: string) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert({ wallet_address });

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
