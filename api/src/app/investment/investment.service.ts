import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import {
  AdminInvestmentQuery,
  CreatePaymentRequest,
  GetInvestmentLeaderboardRequest,
  InvestmentClient,
  InvestmentDb,
  InvestmentLeaderboardItem,
  InvestmentSummary,
} from './investment.interface';
import axios from 'axios';
import { UserService } from '../user/user.service';

@Injectable()
export class InvestmentService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly userService: UserService,
  ) {}
  private readonly supabaseAdmin = this.supabase.getAdmin();
  private readonly tableName = 'investments';

  async getAdminTransactions(
    config: AdminInvestmentQuery,
  ): Promise<InvestmentDb[]> {
    const { from, to } = config;
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getAllTransactionByAddress(
    wallet_address: string,
  ): Promise<InvestmentDb[]> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('wallet_address', wallet_address)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

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

  async getInvestmentLeaderboard({
    period,
    limit_count,
    status_filter,
  }: GetInvestmentLeaderboardRequest): Promise<InvestmentLeaderboardItem[]> {
    const { data, error } = await this.supabaseAdmin.rpc(
      'get_investment_leaderboard',
      { period, limit_count, status_filter },
    );

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data ?? [];
  }

  async getInvestmentByAddress(
    wallet_address: string,
  ): Promise<InvestmentDb[]> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('wallet_address', wallet_address);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getInvestmentByOrderId(order_id: number): Promise<InvestmentDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('order_id', order_id)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getMinAmountNowpayments(currency: string) {
    const realApiKey = process.env.NOWPAYMENTS_API_KEY;

    try {
      const {data} = await axios.get(
        `https://api.nowpayments.io/v1/min-amount?currency_from=usd&currency_to=${currency}`,
        {
          headers: { 'x-api-key': realApiKey },
        },
      );

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewPayments(payload: CreatePaymentRequest) {
    const sandboxApiKey = process.env.NOWPAYMENTS_SANDBOX_API_KEY;
    const sandboxEndpoint = 'https://api-sandbox.nowpayments.io/v1/payment';
    const realApiKey = process.env.NOWPAYMENTS_API_KEY;
    const realCaseEndpoint = 'https://api.nowpayments.io/v1/payment';

    try {
      const { data } = await axios.post(realCaseEndpoint, payload, {
        // headers: { 'x-api-key': sandboxApiKey },
        headers: { 'x-api-key': realApiKey },
      });

      return data;
    } catch (error: any) {
      console.error(
        'NOWPayments error:',
        error.response?.data || error.message,
      );

      // Jika respons dari API NOWPayments ada
      if (error.response) {
        throw new HttpException(
          {
            status: false,
            message: error.response.data?.message || 'NOWPayments API error',
            code: error.response.data?.code || 'NOWPAYMENTS_ERROR',
            data: error.response.data,
          },
          error.response.status || HttpStatus.BAD_GATEWAY,
        );
      }

      // Jika error lain (network, timeout, dll)
      throw new HttpException(
        {
          status: false,
          message: error.message || 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createNewInvestment(payload: InvestmentClient) {
    const user = await this.userService.getUserByAddress(
      payload.wallet_address,
    );

    payload.user_id = user.id;
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async updateStatusPayments(order_id: string, status: string) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('order_id', order_id);

    if (error) {
      console.error(error);
      throw error;
    }
  }
}
