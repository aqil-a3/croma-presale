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
  @Get('/order/:order_id')
  async getAllTransactionByOrderId(@Param('order_id') order_id: number) {
    return await this.investmentService.getInvestmentByOrderId(order_id);
  }

  @UseGuards(SharedSecretGuard)
  @Get('/user/:wallet_address/get-transaction/reward-buy-bonus')
  async getReferralBuyBonusByAddress(
    @Param('wallet_address') wallet_address: string,
  ) {
    return await this.dbHelperService.getReferralBuyBonusByAddress(
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
  @Get('/payments/id/:payment_id')
  async getPaymentStatus(@Param('payment_id') payment_id: string) {
    return await this.investmentService.getPaymentStatus(payment_id);
  }

  @UseGuards(SharedSecretGuard)
  @Get('total-raised')
  async getTotalRaised() {
    return await this.investmentService.getTotalRaised();
  }

  @UseGuards(SharedSecretGuard)
  @Post('')
  async createNewInvestment(@Body() body: InvestmentClient) {
    return await this.investmentService.createNewInvestment(body);
  }

  @UseGuards(SharedSecretGuard)
  @Post('/payments')
  async createNewPayments(@Body() body: CreatePaymentRequest) {
    const { min_amount } = await this.investmentService.getMinAmountNowpayments(
      body.pay_currency,
    );
    const isFixedRate = body.price_amount >= min_amount;

    body.is_fixed_rate = isFixedRate;

    return await this.investmentService.createNewPayments(body);
  }

  @Post('/payments/webhook')
  async webhookNowPayments(@Req() req: Request) {
    const signature = req.headers['x-nowpayments-sig'] as string;
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET!;
    // const ipnSecret = process.env.NOWPAYMENTS_SANDBOX_IPN_SECRET!;
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
      const { payin_hash } = await this.investmentService.getPaymentStatus(
        body.order_id,
      );
      const payload = await this.dbHelperService.mapToReferralRewards(body);
      const referralBuyBonus =
        await this.dbHelperService.mapToReferralBuyBonus(body);

      await this.investmentService.updateTxHash(
        body.payment_id.toString(),
        payin_hash,
      );
      if (!payload || !referralBuyBonus) return;
      await this.dbHelperService.createNewReferralReward(payload);
      await this.dbHelperService.createNewReferralBuyBonusIfNoExist(
        referralBuyBonus,
      );
      await this.dbHelperService.patchReferralStatus(
        'confirmed',
        referralBuyBonus.buyer_wallet,
      );
    }
    return { status: 'ok' };
  }
}
