import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { PresaleClient } from './presale.interface';

@Injectable()
export class PresaleService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'presale';

  async getAllPresale() {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
  
  async getActivePresale(): Promise<PresaleService | null> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return data as PresaleService;
  }

  async createNewPresale(data: PresaleClient) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(data);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
