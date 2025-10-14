import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import {
  CreatePaymentRequest,
  InvestmentClient,
  NowPaymentsWebhook,
} from './investment.interface';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @UseGuards(SharedSecretGuard)
  @Get('/user/:wallet_address/get-transaction/all')
  async getAllTransactionByAddress(
    @Param('wallet_address') wallet_address: string,
  ) {
    return await this.investmentService.getAllTransactionByAddress(
      wallet_address,
    );
  }

  @UseGuards(SharedSecretGuard)
  @Get('/summary')
  async getInvestmentSummary(@Query('wallet_address') wallet_address: string) {
    return await this.investmentService.getInvestmentSummary(wallet_address);
  }

  @UseGuards(SharedSecretGuard)
  @Get('/leaderboard')
  async getInvestmentLeaderboard(
    @Query('period') period: 'all-time' | 'this-week' | 'this-month',
    @Query('status_filter') status_filter?: string[],
    @Query('limit_count') limit_count?: number,
  ) {
    return await this.investmentService.getInvestmentLeaderboard({
      period,
      limit_count,
      status_filter,
    });
  }

  @UseGuards(SharedSecretGuard)
  @Post('')
  async createNewInvestment(@Body() body: InvestmentClient) {
    return await this.investmentService.createNewInvestment(body);
  }

  @UseGuards(SharedSecretGuard)
  @Post('/payments')
  async createNewPayments(@Body() body: CreatePaymentRequest) {
    return await this.investmentService.createNewPayments(body);
  }

  @Post('/payments/webhook')
  async webhookNowPayments(
    @Body() body: NowPaymentsWebhook,
    @Headers() headers: Record<string, string>,
  ) {
    console.log('Headers:', headers);
    console.log('Webhook body:', body);

    // TODO: validasi signature dari headers['x-nowpayments-sig'] (kalau mau)
    await this.investmentService.updateStatusPayments(
      body.payment_id.toString(),
      body.payment_status,
    );
    return;
  }
}
