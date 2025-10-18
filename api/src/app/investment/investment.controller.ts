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
    // const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET!;
    const ipnSecret = process.env.NOWPAYMENTS_SANDBOX_IPN_SECRET!;
    const rawBody = (req as any).rawBody || JSON.stringify(req.body);
    const body: NowPaymentsWebhook = req.body;

    const computed = crypto
      .createHmac('sha512', ipnSecret)
      .update(rawBody)
      .digest('hex');

    if (computed !== signature) {
      throw new UnauthorizedException('Invalid IPN Signature');
    }

    await this.investmentService.updateStatusPayments(
      body.payment_id.toString(),
      body.payment_status,
    );

    if (body.payment_status === 'finished') {
      const payload = await this.dbHelperService.mapToReferralRewards(body);
      await this.dbHelperService.createNewReferralReward(payload);
    }
    return;
  }
}
