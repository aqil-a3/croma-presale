import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { FaqClient } from './faq.interface';

@Injectable()
export class FaqService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'faq';

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

  async createNewFaq(data: FaqClient) {
      const { error } = await this.supabaseAdmin
        .from(this.tableName)
        .insert(data);
  
      if (error) {
        console.error(error);
        throw error;
      }
    }
}
