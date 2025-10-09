import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { CreatePaymentRequest, InvestmentClient } from './investment.interface';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get('/user/:wallet_address/get-transaction/all')
  async getAllTransactionByAddress(
    @Param('wallet_address') wallet_address: string,
  ) {
    return await this.investmentService.getAllTransactionByAddress(
      wallet_address,
    );
  }

  @Get('/summary')
  async getInvestmentSummary(@Query('wallet_address') wallet_address: string) {
    return await this.investmentService.getInvestmentSummary(wallet_address);
  }

  @Post('')
  async createNewInvestment(@Body() body: InvestmentClient) {
    return await this.investmentService.createNewInvestment(body);
  }

  @Post('/payments')
  async createNewPayments(@Body() body: CreatePaymentRequest) {
    console.log(body);
    return await this.investmentService.createNewPayments(body);
  }

  @Post('/payments/webhook')
  async webhookNowPayments(
    @Body() body: any,
    @Headers() headers: Record<string, string>,
  ) {
    console.log('Headers:', headers);
    console.log('Webhook body:', body);

    // TODO: validasi signature dari headers['x-nowpayments-sig'] (kalau mau)
    return 'OK';
  }
}
