import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
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
import { Request } from 'express';

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
async webhookNowPayments(@Req() req: Request) {
  const signature = req.headers['x-nowpayments-sig'] as string;
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET!;
  const rawBody = req.rawBody; // ambil JSON mentah
  const parsedBody = req.body;

  const computed = crypto
    .createHmac('sha512', ipnSecret)
    .update(rawBody) // gunakan rawBody, bukan JSON.stringify(parsedBody)
    .digest('hex');

  console.log('IPN Secret:', ipnSecret);
  console.log('Computed:', computed);
  console.log('Signature:', signature);

  if (computed !== signature) {
    console.warn('❌ Invalid NOWPayments signature');
    throw new UnauthorizedException('Invalid IPN Signature');
  }

  console.log('✅ Valid signature');
  console.log('Webhook body:', parsedBody);

  await this.investmentService.updateStatusPayments(
    parsedBody.payment_id.toString(),
    parsedBody.payment_status,
  );

  if (parsedBody.payment_status === 'success') {
    const payload = await this.dbHelperService.mapToReferralRewards(parsedBody);
    await this.dbHelperService.createNewReferralReward(payload);
  }

  return;
}
}
