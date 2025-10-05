import { Controller, Get, Query } from '@nestjs/common';
import { InvestmentService } from './investment.service';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get('/summary')
  async getInvestmentSummary(@Query('wallet_address') wallet_address: string) {
    return this.investmentService.getInvestmentSummary(wallet_address);
  }
}
