import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import { InvestmentSummary } from './investment.interface';

@Injectable()
export class InvestmentService {
  constructor(private readonly supabase: SupabaseService) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'investments';

  async getInvestmentSummary(wallet_address: string) {
    const { data, error } = await this.supabaseAdmin.rpc(
      'get_investment_summary_by_address',
      { p_wallet_address: wallet_address },
    );

    if (error) {
      console.error(error);
      throw error;
    }
    const summary = data?.[0];

    return summary as InvestmentSummary;
  }
}
