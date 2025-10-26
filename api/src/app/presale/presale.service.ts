import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { PresaleClient } from './presale.interface';

@Injectable()
export class PresaleService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'presale';

  async createNewPresale(data: PresaleClient) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(data);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async editPresale(data: PresaleClient, presaleId: number) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .update(data)
      .eq('id', presaleId);

    if (error) {
      console.error(error);
      throw error;
    }
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

  async getRemainingCRM() {
    const { data, error } = await this.supabaseAdmin.rpc('get_remaining_crm');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

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

  async patchStatusPresale(presaleId: number) {
    const { error: activeError } = await this.supabaseAdmin
      .from(this.tableName)
      .update({ is_active: true })
      .eq('id', presaleId);

    if (activeError) {
      console.error(activeError);
      throw activeError;
    }

    const { error: disactiveError } = await this.supabaseAdmin
      .from(this.tableName)
      .update({ is_active: false })
      .neq('id', presaleId);

    if (disactiveError) {
      console.error(disactiveError);
      throw disactiveError;
    }
  }
}
