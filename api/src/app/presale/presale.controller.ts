import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { PresaleService } from './presale.service';
import { PresaleClient } from './presale.interface';
import { BasicResponse, ResponseWithData } from '../../interface/http';

@Controller('presale')
export class PresaleController {
  constructor(private readonly presaleService: PresaleService) {}
  @Get()
  async getAllPresale() {
    const data = await this.presaleService.getAllPresale();

    return data;
  }

  @Get('/active')
  async getActivePresale(): Promise<ResponseWithData<PresaleService | null>> {
    const data = await this.presaleService.getActivePresale();

    if (!data)
      return {
        data,
        message: 'Data not found',
        ok: false,
      };

    return {
      data,
      message: 'Retreive success',
      ok: true,
    };
  }

  @Patch('/is_active')
  async patchStatusPresale(@Body() data: { presaleId: number }) {
    return await this.presaleService.patchStatusPresale(data.presaleId);
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
