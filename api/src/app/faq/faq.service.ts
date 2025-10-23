import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { FaqClient, FaqDb } from './faq.interface';

@Injectable()
export class FaqService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'faq';

  async createNewFaq(data: FaqClient) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(data);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async editFaq(data: FaqDb) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .update(data)
      .eq('id', data.id);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllFaq() {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*');

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }
}
