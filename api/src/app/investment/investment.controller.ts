import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import {
  CreatePaymentRequest,
  InvestmentClient,
  NowPaymentsWebhook,
} from './investment.interface';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';
import { DbHelpersService } from '../../service/db-helpers/db-helpers.service';
import crypto from 'crypto';

@Controller('investment')
export class InvestmentController {
  constructor(
    private readonly investmentService: InvestmentService,
    private readonly dbHelperService: DbHelpersService,
  ) {}

  @UseGuards(SharedSecretGuard)
  @Get('/all')
  async getAdminTransactions(
    @Query('from') from: number,
    @Query('to') to: number,
  ) {
    return await this.investmentService.getAdminTransactions({ from, to });
  }

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
    @Headers('x-nowpayments-sig') signature: string,
  ) {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    const sortedBody = JSON.stringify(body, Object.keys(body).sort());
    const computed = crypto
      .createHmac('sha512', ipnSecret)
      .update(sortedBody)
      .digest('hex');
    console.log(`IPN Secret :`, ipnSecret);
    console.log(`IPN Secret :`, ipnSecret);
    console.log('Webhook body:', body);

    if (computed !== signature) {
      console.warn('❌ Invalid NOWPayments signature');
      throw new UnauthorizedException('Invalid IPN Signature');
    }

    // TODO: validasi signature dari headers['x-nowpayments-sig'] (kalau mau)
    await this.investmentService.updateStatusPayments(
      body.payment_id.toString(),
      body.payment_status,
    );

    if (body.payment_status === 'success') {
      const payload = await this.dbHelperService.mapToReferralRewards(body);
      await this.dbHelperService.createNewReferralReward(payload);
    }
    return;
  }
}
