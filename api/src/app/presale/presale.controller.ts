import { Body, Controller, Get, Post } from '@nestjs/common';
import { PresaleService } from './presale.service';
import { PresaleClient } from './presale.interface';
import { BasicResponse } from '../../interface/http';

@Controller('presale')
export class PresaleController {
  constructor(private readonly presaleService: PresaleService) {}
  @Get()
  async getAllPresale() {
    const data = await this.presaleService.getAllPresale();

    return data;
  }

  @Post()
  async createNewPresale(@Body() data: PresaleClient): Promise<BasicResponse> {
    try {
      await this.presaleService.createNewPresale(data);
      return { message: 'Add presale data success!', ok: true };
    } catch (error) {
      console.error(error);
      return { message: error.message, ok: false };
    }
  }
}
