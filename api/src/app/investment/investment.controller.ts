import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { CreatePaymentRequest } from './investment.interface';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get('/summary')
  async getInvestmentSummary(@Query('wallet_address') wallet_address: string) {
    return this.investmentService.getInvestmentSummary(wallet_address);
  }

  @Post('/payments')
  async createNewPayments(@Body() body: CreatePaymentRequest) {
    return await this.investmentService.createNewPayments(body);
  }
}
