import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase/supabase.service';
import {
  CreatePaymentRequest,
  InvestmentClient,
  InvestmentDb,
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

  async getAllTransactionByAddress(
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

  async createNewPayments(payload: CreatePaymentRequest) {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;

    try {
      const { data } = await axios.post(
        'https://api.nowpayments.io/v1/payment',
        payload,
        {
          headers: { 'x-api-key': apiKey },
        },
      );

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
